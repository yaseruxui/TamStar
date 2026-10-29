import { HONEYPOT_FIELD } from '@/lib/validation/form-data';

/** Off-screen field that only bots fill in; submissions with a value are silently discarded. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Website</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
