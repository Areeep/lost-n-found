/**
 * @fileoverview Segmented card toggle for post status (Lost vs Found).
 * Follows WCAG AA contrast rules and explicit active borders from design.md.
 */

import { POST_STATUS, STATUS_CONFIG } from "../constants/postConstants";

/**
 * Status toggle selector.
 * @param {Object} props
 * @param {string} props.status - Current selected status ('LOST' | 'FOUND').
 * @param {(status: string) => void} props.onChange - Selection callback.
 */
export function StatusPicker({ status, onChange }) {
  const lostCfg = STATUS_CONFIG[POST_STATUS.LOST];
  const foundCfg = STATUS_CONFIG[POST_STATUS.FOUND];

  const isLostActive = status === POST_STATUS.LOST;
  const isFoundActive = status === POST_STATUS.FOUND;

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-900">
        Status barang
      </label>
      <div className="grid grid-cols-2 gap-3">
        {/* Button: Aku Kehilangan */}
        <button
          type="button"
          onClick={() => onChange(POST_STATUS.LOST)}
          className={`flex min-h-[52px] cursor-pointer flex-col justify-center rounded-xl border-2 p-3 text-left transition ${
            isLostActive
              ? `${lostCfg.activeBorder} ${lostCfg.activeBg}`
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <span
            className={`text-sm leading-tight font-bold ${
              isLostActive ? lostCfg.activeText : "text-gray-900"
            }`}
          >
            {lostCfg.labelTitle}
          </span>
          <span
            className={`mt-0.5 text-xs leading-tight ${
              isLostActive ? lostCfg.activeText : "text-gray-600"
            }`}
          >
            {lostCfg.labelSubtitle}
          </span>
        </button>

        {/* Button: Aku Menemukan */}
        <button
          type="button"
          onClick={() => onChange(POST_STATUS.FOUND)}
          className={`flex min-h-[52px] cursor-pointer flex-col justify-center rounded-xl border-2 p-3 text-left transition ${
            isFoundActive
              ? `${foundCfg.activeBorder} ${foundCfg.activeBg}`
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <span
            className={`text-sm leading-tight font-bold ${
              isFoundActive ? foundCfg.activeText : "text-gray-900"
            }`}
          >
            {foundCfg.labelTitle}
          </span>
          <span
            className={`mt-0.5 text-xs leading-tight ${
              isFoundActive ? foundCfg.activeText : "text-gray-600"
            }`}
          >
            {foundCfg.labelSubtitle}
          </span>
        </button>
      </div>
    </div>
  );
}
