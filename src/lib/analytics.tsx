import { isNonEmptyString } from "@acdh-oeaw/lib";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

declare global {
	interface Window {
		_paq?: Array<unknown>;
	}
}

function trackPageView(url: string): void {
	window._paq?.push(["setCustomUrl", url]);
	window._paq?.push(["trackPageView"]);
	window._paq?.push(["enableLinkTracking"]);
}

function createAnalyticsScript(baseUrl: string, id: string): string {
	return `
  var _paq = (window._paq = window._paq || [])
  _paq.push(['disableCookies'])
  _paq.push(['enableHeartBeatTimer'])
  ;(function () {
    var u = '${baseUrl}'
    _paq.push(['setTrackerUrl', u + 'matomo.php'])
    _paq.push(['setSiteId', '${id}'])
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = u + 'matomo.js'
    s.parentNode.insertBefore(g, s)
  })()`;
}

interface AnalyticsScriptProps {
	baseUrl: string | undefined;
	id: string | undefined;
}

export function AnalyticsScript(props: AnalyticsScriptProps) {
	const { baseUrl, id } = props;

	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeComplete", trackPageView);

		return () => {
			router.events.off("routeChangeComplete", trackPageView);
		};
	}, [router]);

	if (!isNonEmptyString(baseUrl) || !isNonEmptyString(id)) return null;

	const script = createAnalyticsScript(baseUrl, id);

	return <Script dangerouslySetInnerHTML={{ __html: script }} id="analytics" />;
}
