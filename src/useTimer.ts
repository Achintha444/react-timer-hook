import { useEffect, useState } from "react";

/**
 * Type for the returns of the [useTimer] hook.
 */
type UseTimerInterface = {
    /**
     * The number of days.
     */
    days: number;

    /**
     * The number of hours.
     */
    hours: number;

    /**
     * The number of minutes.
     */
    minutes: number;

    /**
     * The number of seconds.
     */
    seconds: number;
};

/**
 * Props for the [useTimer] hook.
 */
export type UseTimerProps = {
    /**
     * The initial number of days.
     */
    initialDays: number;

    /**
     * The initial number of hours.
     */
    initialHours: number;

    /**
     * The initial number of minutes.
     */
    initialMinutes: number;

    /**
     * The initial number of seconds.
     */
    initialSeconds: number;

    /**
    * callback function to handle the change in the number of days.
    */
    onDayChange: () => void;

    /**
     * callback function to handle the change in the number of hours.
     */
    onHourChange: () => void;

    /**
     * callback function to handle the change in the number of minutes.
     */
    onMinuteChange: () => void;

    /**
     * callback function to handle the change in the number of seconds.
     */
    onSecondChange: () => void;
};

/**
 * Hook that provides access to the information about the Revenue data.
 * @returns An object containing the Revenue related data.
 */
const useTimer = (props: UseTimerProps): UseTimerInterface => {
    const {
        initialDays,
        initialHours,
        initialMinutes,
        initialSeconds,
        onDayChange,
        onHourChange,
        onMinuteChange,
        onSecondChange
    } = props;

    const [ days, setDays ] = useState<number>(initialDays);
    const [ hours, setHours ] = useState<number>(initialHours);
    const [ minutes, setMinutes ] = useState<number>(initialMinutes);
    const [ seconds, setSeconds ] = useState<number>(initialSeconds);

    // handle the change of seconds and minutes
    useEffect(() => {
        // if seconds is 0, set it to 59
        if (seconds === 0) {
            setSeconds(59);
        }

        // if minutes is 0, set it to 59
        if (minutes === 0) {
            setMinutes(59);
        }

        // if seconds and minutes are greater than 0, decrement seconds by 1
        if (seconds > 0) {
            setTimeout(() => {
                setSeconds(seconds - 1);

                onSecondChange();
            }, 1000);
        }

        // if seconds is 0 and minutes is greater than 0, decrement minutes by 1
        if (seconds === 0 && minutes > 0) {
            setMinutes(minutes - 1);

            onMinuteChange();
        }
    }, [ seconds, minutes, onSecondChange, onMinuteChange ]);

    // handle the change of hours
    useEffect(() => {
        // if hours is 0, set it to 23
        if (hours === 0) {
            setHours(23);
        }

        // if minutes is 0 and hours is greater than 0, decrement
        if (minutes === 0 && hours > 0) {
            setHours(hours - 1);

            onHourChange();
        }
    }, [ minutes, hours, onHourChange ]);

    // handle the change of days
    useEffect(() => {
        // if day is `initialDays`, set it to `initialDays - 1`
        if (days === initialDays) {
            setDays(initialDays - 1);
        }

        // if hours is 0 and days is greater than 0, decrement hours by 1
        if (hours === 0 && days > 0) {
            setDays(days - 1);

            onDayChange();
        }
    }, [ hours, days ]);

    return {
        days,
        hours,
        minutes,
        seconds
    };
};

export default useTimer;
