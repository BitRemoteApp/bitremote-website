import type { Locale } from '@/i18n/locales';
import { localeLabels, locales } from '@/i18n/locales';
import type { Messages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';

type Active = 'home' | 'support' | 'none';

type Props = {
  locale: Locale;
  messages: Messages;
  active?: Active;
  localeSwitchPath: string;
};

export function TextTabsNav({
  locale,
  messages,
  active = 'none',
  localeSwitchPath,
}: Props) {
  const nav = messages.nav;
  const homeHref = localePath(locale, '/');

  return (
    <nav className="tabsNav" aria-label="Site">
      <div className="container tabsNavInner">
        <div className="tabsGroup">
          <a className="tabLink" data-active={active === 'home'} href={homeHref}>
            {nav.home}
          </a>
          <a className="tabLink" href={`${homeHref}#features`}>
            {nav.features}
          </a>
          <a className="tabLink" href={`${homeHref}#downloaders`}>
            {nav.downloaders}
          </a>
          <a className="tabLink" href={`${homeHref}#how-it-works`}>
            {nav.howItWorks}
          </a>
          <a className="tabLink" href={`${homeHref}#faq`}>
            {nav.faq}
          </a>
          <a
            className="tabLink"
            data-active={active === 'support'}
            href={localePath(locale, '/support/')}
          >
            {nav.support}
          </a>
        </div>

        <div className="localeSwitch" aria-label="Language">
          {locales.map((l) => (
            <a
              key={l}
              className="textButton"
              data-variant={l === locale ? 'primary' : 'secondary'}
              href={localePath(l, localeSwitchPath)}
              aria-current={l === locale ? 'page' : undefined}
            >
              {localeLabels[l]}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
