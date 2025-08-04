export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block mb-2 text-sm font-medium text-primary ` + className
            }
        >
            {value ? value : children}
        </label>
    );
}
