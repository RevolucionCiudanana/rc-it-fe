import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
    ]),
]);

export const fadeInDownAnimation = trigger('fadeInDownAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
]);

export const fadeInLeftAnimation = trigger('fadeInLeftAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
]);

export const fadeInRightAnimation = trigger('fadeInRightAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
]);

export const fadeInUpAnimation = trigger('fadeInUpAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
]);


export const zoomInAnimation = trigger('zoomInAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
]);

export const zoomInDownAnimation = trigger('zoomInDownAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateY(-100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
    ]),
]);

export const zoomInLeftAnimation = trigger('zoomInLeftAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateX(-100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
    ]),
]);

export const zoomInRightAnimation = trigger('zoomInRightAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateX(100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
    ]),
]);

export const zoomInUpAnimation = trigger('zoomInUpAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translateY(100%)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
    ]),
]);

export const cartTossAnimation = trigger('tossAnimation', [
    state('start', style({
        transform: 'translateX(0) translateY(0)',
        opacity: 1
    })),
    state('end', style({
        transform: 'translateX(200px) translateY(-200px)',
        opacity: 0
    })),
    transition('start => end', [
        animate('0.5s ease-in')
    ])
])