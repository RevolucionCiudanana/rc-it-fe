import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '@services/member.service';
import { Member } from '@models/member';
import { ProfessionService } from '@services/profession.service';
import { forkJoin, Observable, tap } from 'rxjs';
import { SectorService } from '@services/sector.service';
import * as moment from 'moment';

@Component({
  selector: 'app-charts-member',
  standalone: true,
  templateUrl: './charts-member.component.html',
  styleUrls: ['./charts-member.component.scss'],
  imports: [CommonModule, ChartModule],
})
export class ChartsMemberComponent implements OnInit {
  members: Member[] = [];
  professions: any[] = [];
  sectors: any[] = [];
  professionMap: { [key: string]: string } = {};
  sectorMap: { [key: string]: string } = {};
  countryChart!: Chart;
  professionChart!: Chart;
  sectorChart!: Chart;
  memberGrowthChart!: Chart;
  townCountyChart!: Chart;
  ageDistributionChart!: Chart;
  chartCountryTitle: string = "";
  chartLabelMembers: string = "";
  chartLabelNumberMembers: string = "";
  chartLabelProfessionId: string = "";
  chartLabelSectorId: string = "";
  chartLabelComulativeMembers: string = "";
  chartLabelAgeGroup: string = "";

  constructor(private translate: TranslateService, private sectorService: SectorService, private professionService: ProfessionService, private memberService: MemberService) { }

  ngOnInit() {
    // Set the language on initialization
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'it';  // Default to Italian ('it')
    this.translate.use(savedLanguage);  // Apply the saved language
    moment.locale(savedLanguage || 'it'); // Default to Italian if no language saved
    this.getMembers();
    // Create charts

  }
  getMembers() {
    this.memberService.getAllMembers().subscribe(
      (response: any) => {
        this.members = response;

        // Load all professions, then translate strings and create the charts
        this.loadAllProfessions().subscribe(() => {
          this.loadSectors().subscribe(() => {
            this.translateStrings();
            this.createCountryChart();
            this.createProfessionChart(); // Now this is called only after professions are loaded
            this.createSectorChart();
            this.createMemberGrowthChart();
            this.createTownCountyChart();
            this.createAgeDistributionChart();
          });
        });
      },
      (error: any) => {
        console.error('Error fetching members', error);
      }
    );
  }

  translateStrings() {
    this.translate.get('CHART_TYPECHART_MEMBERS').subscribe((translatedTitle) => {
      this.chartLabelMembers = translatedTitle
    });
    this.translate.get('CHART_TYPECHART_TITLE_COUNTRY').subscribe((translatedTitle) => {
      this.chartCountryTitle = translatedTitle
    });

    this.translate.get('CHART_TYPECHART_YAXIS_MEMBERS').subscribe((translatedTitle) => {
      this.chartLabelNumberMembers = translatedTitle
    });
    this.translate.get('CHART_TYPECHART_XAXIS_PROFESSION_ID').subscribe((translatedTitle) => {
      this.chartLabelProfessionId = translatedTitle
    });

    this.translate.get('CHART_TYPECHART_XAXIS_AGEGROUP').subscribe((translatedTitle) => {
      this.chartLabelAgeGroup = translatedTitle
    });



    this.translate.get('CHART_TYPECHART_XAXIS_SECTOR_ID').subscribe((translatedTitle) => {
      this.chartLabelSectorId = translatedTitle
    });



    this.translate.get('CHART_TYPECHART_COMULATIVE_MEMBERS').subscribe((translatedTitle) => {
      this.chartLabelComulativeMembers = translatedTitle
    });


  }

  createCountryChart() {
    const countryData = this.members.reduce((acc: { [key: string]: number }, member) => {
      if (member.country) { // Check if member.country is defined
        acc[member.country] = (acc[member.country] || 0) + 1;
      }
      return acc;
    }, {});

    const chartData = Object.keys(countryData).map(country => ({
      name: country,
      y: countryData[country]
    }));



    this.countryChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: this.chartCountryTitle
      },
      series: [{
        type: 'pie',
        name: this.chartLabelMembers,
        data: chartData
      }],
      credits: {
        enabled: false
      },
    });
  }

  loadSectors(): Observable<any> {
    return new Observable((observer) => {
      this.sectorService.getSectors().subscribe(
        (data) => {
          this.sectors = [];
          const translationRequests: Observable<any>[] = [];

          data.forEach((sector) => {
            const translationObservable = this.translate.get(sector.code).pipe(
              tap((translatedName) => {
                this.sectors.push({
                  ...sector,
                  name: translatedName,
                });
                // Store in the map
                if (sector.id) {
                  this.sectorMap[sector.id] = translatedName; // Assuming sector has an 'id' property
                }
              })
            );
            translationRequests.push(translationObservable);
          });

          // Wait until all translations are done before proceeding
          forkJoin(translationRequests).subscribe(
            () => {
              observer.next();
              observer.complete();
            },
            (error) => {
              console.error('Error translating sectors:', error);
              observer.error(error);
            }
          );
        },
        (error) => {
          console.error('Error fetching sectors:', error);
          observer.error(error);
        }
      );
    });
  }

  loadAllProfessions(): Observable<any> {
    this.professions = [];

    // Create an array of observables for translating all profession names
    const translationRequests: Observable<unknown>[] = [];

    return new Observable(observer => {
      this.professionService.getAllProfessions().subscribe(
        (data) => {
          data.forEach(profession => {
            const translationObservable = this.translate.get(profession.code).pipe(
              tap(translatedName => {
                this.professions.push({
                  ...profession,
                  name: translatedName
                });

                // Convert profession.id to string and store it in professionMap
                if (profession.id) {
                  this.professionMap[String(profession.id)] = translatedName;
                }
              })
            );
            translationRequests.push(translationObservable);
          });

          // Wait until all translations are done before proceeding
          forkJoin(translationRequests).subscribe(() => {
            observer.next();
            observer.complete();
          });
        },
        (error) => {
          console.error('Error fetching professions:', error);
          observer.error(error);
        }
      );
    });
  }



  getProfessionName(professionId: string): string {

    const cleanProfessionId = professionId.trim();

    const professionName = this.professionMap[cleanProfessionId];

    return professionName ? professionName : 'Unknown Profession';
  }

  getSectorName(sectorId: string): string {
    return this.sectorMap[sectorId] || sectorId; // Return ID if not found
  }


  createProfessionChart() {
    if (Object.keys(this.professionMap).length === 0) {
      console.warn('Profession map is empty. Ensure professions have been loaded.');
      return; // Exit early if the professionMap is not ready
    }

    // Aggregate members by professionId
    const professionData = this.members.reduce((acc: { [key: string]: number }, member) => {
      if (member.professionId) {
        acc[member.professionId] = (acc[member.professionId] || 0) + 1;
      }
      return acc;
    }, {});

    // Prepare chart data with profession names
    const chartData = Object.keys(professionData).map(professionId => ({
      name: this.getProfessionName(professionId), // Get the profession name from professionId
      y: professionData[professionId]
    }));

    // Prepare X-axis categories with profession names
    const professionNames = Object.keys(professionData).map(professionId => this.getProfessionName(professionId));

    this.translate.get('CHART_TYPECHART_TITLE_PROFESSION').subscribe((translatedTitle) => {
      this.professionChart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: translatedTitle
        },
        xAxis: {
          categories: professionNames, // Use profession names for X-axis categories
          title: {
            text: this.chartLabelProfessionId
          }
        },
        yAxis: {
          title: {
            text: this.chartLabelNumberMembers
          }
        },
        series: [{
          type: 'column',
          name: this.chartLabelMembers,
          data: chartData // Use the chart data with profession names
        }],
        credits: {
          enabled: false
        },
      });
    });
  }

  createSectorChart() {
    // Aggregate members by sectorId
    const sectorData = this.members.reduce(
      (acc: { [key: string]: number }, member) => {
        if (member.sectorId) {
          acc[member.sectorId] = (acc[member.sectorId] || 0) + 1;
        }
        return acc;
      },
      {}
    );

    // Prepare chart data with sector names
    const chartData = Object.keys(sectorData).map((sectorId) => ({
      name: this.getSectorName(sectorId), // Get the sector name from sectorId
      y: sectorData[sectorId],
    }));

    // Prepare X-axis categories with sector names
    const sectorNames = Object.keys(sectorData).map((sectorId) =>
      this.getSectorName(sectorId)
    );

    this.translate.get('CHART_TYPECHART_TITLE_SECTOR').subscribe((translatedTitle) => {
      this.sectorChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: translatedTitle,
        },
        xAxis: {
          categories: sectorNames, // Use sector names for X-axis categories
          title: {
            text: this.chartLabelSectorId, // Adjusted as necessary
          },
        },
        yAxis: {
          title: {
            text: this.chartLabelNumberMembers,
          },
        },
        series: [
          {
            type: 'column',
            name: this.chartLabelMembers,
            data: chartData, // Use the chart data with sector names
          },
        ],
        credits: {
          enabled: false,
        },
      });
    });
  }

  createMemberGrowthChart() {
    const growthData = this.members.map(member => ({
      x: member.createdAt ? moment(member.createdAt).valueOf() : Date.now(), // Use moment to get timestamp
      y: 1
    }));

    this.translate.get(['CHART_TYPECHART_TITLE_GROWTH', 'CHART_TYPECHART_MEMBERS', 'CHART_TYPECHART_XAXIS_DATE']).subscribe((translations) => {
      this.memberGrowthChart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: translations['CHART_TYPECHART_TITLE_GROWTH']
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          },
          labels: {
            formatter: function () {
              return moment(this.value).format('DD MMM YYYY'); // Format date for xAxis labels
            }
          }
        },
        yAxis: {
          title: {
            text: this.chartLabelComulativeMembers
          }
        },
        tooltip: {
          formatter: function () {
            const date = moment(this.x).format('DD MMM YYYY'); // Format date in tooltip
            const members = this.y;
            // Return translated and formatted tooltip content
            return `<strong>${translations['CHART_TYPECHART_XAXIS_DATE']}:</strong> ${date}<br/>
                  <strong>${translations['CHART_TYPECHART_MEMBERS']}:</strong> ${members}`;
          }
        },
        series: [{
          type: 'line',
          name: this.chartLabelMembers,
          data: growthData,
          cumulative: true
        }],
        credits: {
          enabled: false
        },
      });
    });
  }

  createTownCountyChart() {
    // Accumulate data by town or county
    const locationData = this.members.reduce((acc: { [key: string]: number }, member) => {
      // Use town if available, otherwise use county
      const location = member.town || member.county;
      if (location) {
        acc[location] = (acc[location] || 0) + 1;
      }
      return acc;
    }, {});

    // Prepare chart data
    const chartData = Object.keys(locationData).map(location => ({
      name: location,
      y: locationData[location]
    }));

    // Translate title and create the chart
    this.translate.get(['CHART_TYPECHART_TITLE_COUNTY','CHART_AXIS_TITLE_LOCATION']).subscribe((translatedTitle) => {
      this.townCountyChart = new Chart({
        chart: {
          type: 'bar'
        },
        title: {
          text: this.translate.instant('CHART_TYPECHART_TITLE_COUNTY')
        },
        xAxis: {
          categories: Object.keys(locationData),
          title: {
            text: this.translate.instant('CHART_AXIS_TITLE_LOCATION')
          }
        },
        yAxis: {
          title: {
            text: this.chartLabelNumberMembers
          }
        },
        series: [{
          type: 'bar',
          name: this.chartLabelMembers,
          data: chartData
        }],
        credits: {
          enabled: false
        }
      });
    });
  }


  createAgeDistributionChart() {
    // Calculate age for each member
    const ageData = this.members.reduce((acc: { [key: string]: number }, member) => {
      if (member.birthdate) {
        const age = this.calculateAge(member.birthdate);
        const ageGroup = this.getAgeGroup(age);
        acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      }
      return acc;
    }, {});

    // Prepare chart data with age groups
    const chartData = Object.keys(ageData).map(ageGroup => ({
      name: ageGroup,
      y: ageData[ageGroup]
    }));
    this.translate.get('CHART_TYPECHART_TITLE_AGEDISTRIBUTION').subscribe((translatedTitle) => {
      this.ageDistributionChart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: translatedTitle
        },
        xAxis: {
          categories: Object.keys(ageData),
          title: {
            text: this.chartLabelAgeGroup
          }
        },
        yAxis: {
          title: {
            text: this.chartLabelNumberMembers
          }
        },
        series: [{
          type: 'column',
          name: this.chartLabelMembers,
          data: chartData
        }],
        credits: {
          enabled: false
        },
      });
    })
  }

  // Helper function to calculate age
  calculateAge(birthdate: string): number {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Helper function to categorize age into groups
  getAgeGroup(age: number): string {
    if (age < 18) return 'Under 18';
    if (age < 30) return '18-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    if (age < 60) return '50-59';
    return '60+';
  }


}
