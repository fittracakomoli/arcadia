import { forwardRef, useRef } from "react";

export default forwardRef(function TextArea({ className = "", ...props }, ref) {
    const localRef = useRef(null);
    const inputRef = ref || localRef;

    return (
        <textarea
            {...props}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={inputRef}
        ></textarea>
    );
});
