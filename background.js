const domains = ["exploreomni", "omniapp", "thundersalmon"];
const tlds = ["com", "dev", "co"];

// Create rules for each domain and TLD combination
const rules = domains.flatMap((domain, domainIndex) =>
  tlds.map((tld, tldIndex) => ({
    id: domainIndex * tlds.length + tldIndex + 1,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          path: "/support/login",
        },
      },
    },
    condition: {
      urlFilter: `*://*.${domain}.${tld}/login`,
      resourceTypes: ["main_frame"],
    },
  }))
);

// Register the rules when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated, setting up rules...");

  // First remove any existing rules
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const existingRuleIds = existingRules.map((rule) => rule.id);
    if (existingRuleIds.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: existingRuleIds,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "Error removing existing rules:",
              chrome.runtime.lastError
            );
            return;
          }
          addNewRules();
        }
      );
    } else {
      addNewRules();
    }
  });
});

function addNewRules() {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: rules,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error adding new rules:", chrome.runtime.lastError);
      } else {
        console.log("Rules successfully added:", rules);
      }
    }
  );
}
