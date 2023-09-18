import React from "react";

import Icon from "components/Icon";

// the source of truth for the filter option names.
// there are used on many other pages but we define them here.
// TODO: add other filter options here. Also look to define this in
// the host entities file later.
export const DISK_ENCRYPTION_QUERY_PARAM_NAME = "os_settings_disk_encryption";

export const MANAGE_HOSTS_PAGE_FILTER_KEYS = [
  "query",
  "team_id",
  "policy_id",
  "policy_response",
  "macos_settings",
  "software_id",
  "status",
  "mdm_id",
  "mdm_enrollment_status",
  "os_id",
  "os_name",
  "os_version",
  "munki_issue_id",
  "low_disk_space",
  DISK_ENCRYPTION_QUERY_PARAM_NAME,
  "bootstrap_package",
] as const;

// TODO: refactor to use this type as the location.query prop of the page
export type ManageHostsPageQueryParams = Record<
  | "page"
  | "order_key"
  | "order_direction"
  | typeof MANAGE_HOSTS_PAGE_FILTER_KEYS[number],
  string
>;

export const LABEL_SLUG_PREFIX = "labels/";

export const DEFAULT_SORT_HEADER = "display_name";
export const DEFAULT_SORT_DIRECTION = "asc";
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_INDEX = 0;

export const getHostSelectStatuses = (isSandboxMode = false) => {
  return [
    {
      disabled: false,
      label: "All hosts",
      value: "",
      helpText: "All hosts added to Fleet.",
    },
    {
      disabled: false,
      label: "Online hosts",
      value: "online",
      helpText: "Hosts that will respond to a live query.",
    },
    {
      disabled: false,
      label: "Offline hosts",
      value: "offline",
      helpText: "Hosts that won’t respond to a live query.",
    },
    {
      disabled: false,
      label: isSandboxMode ? (
        <span>
          <span>Missing hosts</span>
          <Icon name="premium-feature" className="premium-feature-icon" />
          {/* <PremiumFeatureIconWithTooltip /> */}
        </span>
      ) : (
        "Missing hosts"
      ),
      value: "missing",
      helpText: "Hosts that have been offline for 30 days or more.",
    },
    {
      disabled: false,
      label: "New hosts",
      value: "new",
      helpText: "Hosts added to Fleet in the last 24 hours.",
    },
  ];
};

export const MAC_SETTINGS_FILTER_OPTIONS = [
  {
    disabled: false,
    label: "Verified",
    value: "verified",
  },
  {
    disabled: false,
    label: "Verifying",
    value: "verifying",
  },
  {
    disabled: false,
    label: "Pending",
    value: "pending",
  },
  {
    disabled: false,
    label: "Failed",
    value: "failed",
  },
];
