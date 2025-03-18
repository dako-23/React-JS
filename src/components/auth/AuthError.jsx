export default function AuthError({
    err
}) {
    return (
        <p className="text-red-600 text-sm mb-2 font-semibold">{err}</p>
    );
}