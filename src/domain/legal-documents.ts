import type { Locale } from '@/i18n/locales';

export type LegalDocumentKind = 'privacy' | 'eula' | 'scta';

export type LegalLink = {
  title: string;
  href: string;
};

export type LegalSection = {
  title: string;
  content: string;
  links?: readonly LegalLink[];
};

export type LegalDocument = {
  kind: LegalDocumentKind;
  title: string;
  eyebrow: string;
  intro: string;
  contentsLabel: string;
  sections: readonly LegalSection[];
};

const thirdPartyPrivacyLinks = [
  { title: 'AdMob', href: 'https://support.google.com/admob/answer/6128543' },
  { title: 'Firebase', href: 'https://firebase.google.com/support/privacy' },
] as const;

export const legalDocumentPathByKind: Record<LegalDocumentKind, string> = {
  privacy: '/terms/privacy/',
  eula: '/terms/eula/',
  scta: '/terms/scta/',
};

const sctaDisclosureDocuments: Record<Locale, LegalDocument> = {
  en: {
    kind: 'scta',
    title: 'Specified Commercial Transactions Act Disclosure',
    eyebrow: 'Legal',
    intro:
      'Transaction details for BitRemote under Japan’s Specified Commercial Transactions Act.',
    contentsLabel: 'Disclosure items',
    sections: [
      {
        title: 'Seller',
        content: 'Ark Studios LLC',
      },
      {
        title: 'Operations Manager',
        content: 'Tsuyoshi Araki',
      },
      {
        title: 'Address',
        content:
          '2F-C, Shibuya Dogenzaka Tokyu Bldg., 1-10-8 Dogenzaka, Shibuya, Tokyo 150-0043, Japan',
      },
      {
        title: 'Contact',
        content:
          'Email: support@bitremote.app\n\nIf you request a telephone number, we will reply by email without delay.',
      },
      {
        title: 'Sales Price',
        content:
          'BitRemote is free to download. The App Store and in-app purchase screen show tax-inclusive prices for paid plans and purchases.',
      },
      {
        title: 'Additional Fees',
        content:
          'You are responsible for internet connection fees, data charges, and any other costs needed to access the App Store or use BitRemote.',
      },
      {
        title: 'Payment Method',
        content:
          'Use the payment method registered with your Apple ID through the App Store.',
      },
      {
        title: 'Payment Timing',
        content:
          'The App Store charges you when you finish a purchase. If a subscription plan is offered, it renews unless you cancel before the current period ends.',
      },
      {
        title: 'Delivery Timing',
        content:
          'The app and purchased digital features are usually available as soon as the App Store finishes the download or purchase.',
      },
      {
        title: 'Cancellation and Refunds',
        content:
          'Because BitRemote is digital software, Ark Studios LLC does not accept customer-requested cancellations after purchase. Apple handles refund requests under its App Store terms and refund process.',
      },
      {
        title: 'Operating Environment',
        content:
          'BitRemote needs iOS 26.0 or later, iPadOS 26.0 or later, or macOS 26.0 or later. Check the App Store for the latest compatibility information.',
      },
      {
        title: 'Special Conditions',
        content:
          'BitRemote controls compatible downloader clients remotely. It does not download files on your device. You need a compatible downloader, network access to it, and credentials that you manage. Features may vary by device, operating system, region, and app version.',
      },
      {
        title: 'Application Period',
        content:
          'There is no special application period unless the App Store or the app shows one.',
      },
      {
        title: 'Language',
        content:
          'This translation is for reference. If it differs from the Japanese disclosure, the Japanese disclosure prevails.',
      },
    ],
  },
  ja: {
    kind: 'scta',
    title: '特定商取引法に基づく表記',
    eyebrow: 'Legal',
    intro: 'BitRemote について、特定商取引法に基づき通信販売の表示事項を掲載しています。',
    contentsLabel: '表示事項',
    sections: [
      {
        title: '販売事業者',
        content: 'Ａｒｋ　Ｓｔｕｄｉｏｓ合同会社\nArk Studios LLC',
      },
      {
        title: '運営責任者',
        content: '荒木強',
      },
      {
        title: '所在地',
        content: '〒150-0043\n東京都渋谷区道玄坂１丁目１０番８号渋谷道玄坂東急ビル２Ｆ－Ｃ',
      },
      {
        title: '連絡先',
        content:
          'メールアドレス：support@bitremote.app\n\n電話番号が必要な場合は、メールでご請求ください。遅滞なく返信します。',
      },
      {
        title: '販売価格',
        content:
          'BitRemote は無料でダウンロードできます。有料プランおよびアプリ内課金の価格は、App Store またはアプリ内購入画面に税込価格で表示されます。',
      },
      {
        title: '商品代金以外の必要料金',
        content:
          'App Store へのアクセスまたは BitRemote の利用に必要なインターネット接続料金、通信料金その他の費用は、お客様の負担となります。',
      },
      {
        title: '支払方法',
        content: 'App Store 決済によりお支払いいただきます。お客様の Apple ID に登録された支払方法が使われます。',
      },
      {
        title: '支払時期',
        content:
          'App Store またはアプリ内購入画面で購入が完了した時点で課金されます。サブスクリプションが提供される場合、現在の期間終了前に解約されない限り、各更新時に課金されます。',
      },
      {
        title: '提供時期',
        content:
          'BitRemote および購入済みのデジタル機能は、App Store でのダウンロードまたは購入完了後、通常直ちに利用可能になります。',
      },
      {
        title: 'キャンセルおよび返金',
        content:
          'BitRemote はデジタルソフトウェアです。購入完了後のお客様都合によるキャンセルは、Ark Studios LLC では受け付けていません。返金の請求は、Apple の App Store の規約および返金手続きに従って取り扱われます。',
      },
      {
        title: '動作環境',
        content:
          'BitRemote の利用には iOS 26.0 以降、iPadOS 26.0 以降、または macOS 26.0 以降が必要です。最新の対応環境は App Store でご確認ください。',
      },
      {
        title: '特別な販売条件',
        content:
          'BitRemote は対応するダウンロードツールを遠隔操作するアプリです。端末上にファイルを直接ダウンロードするものではありません。利用には、対応するダウンロードツール、そのツールへ接続できるネットワーク環境、およびお客様が管理する認証情報が必要です。機能の提供状況は、端末、OS、地域、アプリのバージョンにより異なる場合があります。',
      },
      {
        title: '申込有効期限',
        content: 'App Store またはアプリ内で別途表示される場合を除き、特別な申込有効期限はありません。',
      },
    ],
  },
  'zh-hans': {
    kind: 'scta',
    title: '基于日本特定商业交易法的标示',
    eyebrow: 'Legal',
    intro: '本页面列出 BitRemote 依据日本特定商业交易法需要说明的通信销售事项。',
    contentsLabel: '标示事项',
    sections: [
      {
        title: '销售经营者',
        content: 'Ark Studios LLC',
      },
      {
        title: '运营负责人',
        content: 'Tsuyoshi Araki',
      },
      {
        title: '地址',
        content:
          '2F-C, Shibuya Dogenzaka Tokyu Bldg., 1-10-8 Dogenzaka, Shibuya, Tokyo 150-0043, Japan',
      },
      {
        title: '联系方式',
        content: '电子邮件：support@bitremote.app\n\n如需电话号码，请通过电子邮件联系我们。我们会及时回复。',
      },
      {
        title: '销售价格',
        content:
          'BitRemote 可免费下载。付费方案和应用内购买项目的含税价格会显示在 App Store 或应用内购买界面。',
      },
      {
        title: '价格以外的必要费用',
        content:
          '访问 App Store 或使用 BitRemote 所需的互联网连接费、通信费及其他费用由客户承担。',
      },
      {
        title: '支付方式',
        content: '通过 App Store 付款。付款会使用客户 Apple ID 中登记的支付方式。',
      },
      {
        title: '支付时间',
        content:
          '客户在 App Store 或应用内购买界面完成购买时即会被扣款。如提供订阅方案，除非在当前周期结束前取消，否则会在每次续订时扣款。',
      },
      {
        title: '提供时间',
        content:
          'BitRemote 及已购买的数字功能通常会在 App Store 下载或购买完成后立即可用。',
      },
      {
        title: '取消与退款',
        content:
          'BitRemote 属于数字软件。购买完成后，Ark Studios LLC 不接受因客户原因提出的取消。退款请求将根据 Apple 的 App Store 条款和退款流程处理。',
      },
      {
        title: '运行环境',
        content:
          'BitRemote 需要 iOS 26.0 或更高版本、iPadOS 26.0 或更高版本，或 macOS 26.0 或更高版本。请在 App Store 确认最新兼容性信息。',
      },
      {
        title: '特别条件',
        content:
          'BitRemote 用于远程控制兼容的下载工具，不会在设备本机下载文件。使用本应用需要兼容的下载工具、可连接至该工具的网络环境，以及由客户自行管理的认证信息。功能可用性可能因设备、操作系统、地区和应用版本而异。',
      },
      {
        title: '申请有效期',
        content: '除非 App Store 或应用内另有显示，否则没有特别的申请有效期。',
      },
      {
        title: '语言',
        content: '本翻译仅供参考。如本翻译与日文标示内容不一致，以日文标示为准。',
      },
    ],
  },
  'zh-hant': {
    kind: 'scta',
    title: '依日本特定商業交易法標示',
    eyebrow: 'Legal',
    intro: '本頁列出 BitRemote 依日本特定商業交易法需要說明的通信銷售事項。',
    contentsLabel: '標示事項',
    sections: [
      {
        title: '銷售經營者',
        content: 'Ark Studios LLC',
      },
      {
        title: '營運負責人',
        content: 'Tsuyoshi Araki',
      },
      {
        title: '地址',
        content:
          '2F-C, Shibuya Dogenzaka Tokyu Bldg., 1-10-8 Dogenzaka, Shibuya, Tokyo 150-0043, Japan',
      },
      {
        title: '聯絡方式',
        content: '電子郵件：support@bitremote.app\n\n如需電話號碼，請透過電子郵件與我們聯絡。我們會及時回覆。',
      },
      {
        title: '銷售價格',
        content:
          'BitRemote 可免費下載。付費方案與 App 內購買項目的含稅價格會顯示於 App Store 或 App 內購買畫面。',
      },
      {
        title: '價格以外的必要費用',
        content:
          '存取 App Store 或使用 BitRemote 所需的網際網路連線費、通訊費及其他費用，均由客戶負擔。',
      },
      {
        title: '付款方式',
        content: '透過 App Store 付款。付款會使用客戶 Apple ID 中登錄的付款方式。',
      },
      {
        title: '付款時間',
        content:
          '客戶在 App Store 或 App 內購買畫面完成購買時即會被扣款。如提供訂閱方案，除非於目前週期結束前取消，否則會於每次續訂時扣款。',
      },
      {
        title: '提供時間',
        content:
          'BitRemote 及已購買的數位功能通常會在 App Store 下載或購買完成後立即可用。',
      },
      {
        title: '取消與退款',
        content:
          'BitRemote 屬於數位軟體。購買完成後，Ark Studios LLC 不接受因客戶原因提出的取消。退款請求將依 Apple 的 App Store 條款與退款流程處理。',
      },
      {
        title: '運作環境',
        content:
          'BitRemote 需要 iOS 26.0 或更新版本、iPadOS 26.0 或更新版本，或 macOS 26.0 或更新版本。請於 App Store 確認最新相容性資訊。',
      },
      {
        title: '特別條件',
        content:
          'BitRemote 用於遠端控制相容的下載工具，不會在裝置本機下載檔案。使用本 App 需要相容的下載工具、可連線至該工具的網路環境，以及由客戶自行管理的認證資訊。功能可用性可能因裝置、作業系統、地區與 App 版本而異。',
      },
      {
        title: '申請有效期限',
        content: '除非 App Store 或 App 內另有顯示，否則沒有特別的申請有效期限。',
      },
      {
        title: '語言',
        content: '本翻譯僅供參考。如本翻譯與日文標示內容不一致，以日文標示為準。',
      },
    ],
  },
};

export const legalDocuments = {
  en: {
    privacy: {
      kind: 'privacy',
      title: 'BitRemote Privacy Policy',
      eyebrow: 'Legal',
      intro: 'This policy explains how Ark Studios LLC handles information related to BitRemote.',
      contentsLabel: 'Privacy policy sections',
      sections: [
        {
          title: 'Overview',
          content:
            'Ark Studios LLC built the BitRemote app as a Commercial app. This SERVICE is provided by Ark Studios LLC and is intended for use as is.\n\nThis page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.\n\nIf you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.\n\nThe terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at BitRemote unless otherwise defined in this Privacy Policy.',
        },
        {
          title: 'Information Collection and Use',
          content:
            'For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to collection of personal information, ad delivery, usage analysis. The information that we request will be retained by us and used as described in this privacy policy.\n\nThe app does use third-party services that may collect information used to identify you.\n\nLink to the privacy policy of third-party service providers used by the app:',
          links: thirdPartyPrivacyLinks,
        },
        {
          title: 'Log Data',
          content:
            'We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.',
        },
        {
          title: 'Service Providers',
          content:
            'We may employ third-party companies and individuals due to the following reasons:\n\n・To facilitate our Service;\n・To provide the Service on our behalf;\n・To perform Service-related services; or\n・To assist us in analyzing how our Service is used.\n\nWe want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.',
        },
        {
          title: 'Security',
          content:
            'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.',
        },
        {
          title: 'Links to Other Sites',
          content:
            'This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.',
        },
        {
          title: 'Children’s Privacy',
          content:
            'These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.',
        },
        {
          title: 'Disputes',
          content:
            'This Privacy Policy shall be interpreted and applied in accordance with the laws of Japan. Furthermore, for disputes related to this Privacy Policy, the Tokyo Summary Court or the Tokyo District Court shall be the exclusive agreed jurisdictional court of first instance, depending on the amount of the claim.',
        },
        {
          title: 'Changes to This Privacy Policy',
          content:
            'We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.\n\nThis policy is effective as of 2024-07-09.',
        },
        {
          title: 'Contact Us',
          content:
            'If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@bitremote.app.',
        },
      ],
    },
    eula: {
      kind: 'eula',
      title: 'BitRemote End User License Agreement',
      eyebrow: 'Legal',
      intro: 'This agreement defines the license terms for using BitRemote.',
      contentsLabel: 'EULA sections',
      sections: [
        {
          title: 'Agreement and Priority of EULA',
          content:
            "By using this Licensed Application, you agree to the terms of both this End User License Agreement and the Apple's standard EULA (https://www.apple.com/legal/internet-services/itunes/dev/stdeula). This Agreement is designed to complement and supersede the Apple's standard EULA in instances where discrepancies or conflicts arise. All terms of the Apple's standard EULA remain in effect except where explicitly modified by this Agreement. You acknowledge and agree that this Agreement takes precedence over the Apple's standard EULA for all purposes related to your use of the Licensed Application.",
        },
        {
          title: 'Limitation on Simultaneous Use Across Platforms',
          content:
            'You are granted the ability to use the Licensed Application on an unlimited number of devices that you own or control. However, you may not simultaneously use the Licensed Application on more than three devices per Apple platform (including iOS, iPadOS, macOS, watchOS, tvOS, and visionOS). If the Application is activated on more than three devices per platform at the same time, the earliest activated device(s) will be automatically deactivated. You acknowledge and agree that this limit of simultaneous use applies separately to each Apple platform.',
        },
        {
          title: 'One-Time Purchase Plan',
          content:
            'BitRemote+ Advanced is a one-time purchase plan that unlocks exclusive features available in the app at the time of purchase. Continued access depends on the app remaining available and compatible with supported platforms and devices. Features and services may change or be discontinued over time.',
        },
        {
          title: 'Precedence of the English Version',
          content:
            'In the event of any discrepancies or conflicts between the English version of this Agreement and its translations, the English version shall prevail. This clause is intended to ensure clarity and avoid legal ambiguities that may arise from translation differences. You acknowledge and agree that the English version of this Agreement shall be the definitive version for interpreting the terms and conditions of use.',
        },
        {
          title: 'Disputes',
          content:
            'This EULA shall be interpreted and applied in accordance with the laws of Japan. Furthermore, for disputes related to this EULA, the Tokyo Summary Court or the Tokyo District Court shall be the exclusive agreed jurisdictional court of first instance, depending on the amount of the claim.',
        },
        {
          title: 'Changes to This EULA',
          content:
            'We may update our EULA from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new EULA on this page.\n\nThis policy is effective as of 2024-07-09.\nLast updated: 2026-03-20.',
        },
        {
          title: 'Contact Us',
          content:
            'If you have any questions or suggestions about our EULA, do not hesitate to contact us at support@bitremote.app.',
        },
      ],
    },
    scta: sctaDisclosureDocuments.en,
  },
  ja: {
    privacy: {
      kind: 'privacy',
      title: 'BitRemote 個人情報保護方針',
      eyebrow: '法務',
      intro: 'Ark Studios LLC が BitRemote に関連する情報をどのように取り扱うかを説明します。',
      contentsLabel: '個人情報保護方針の項目',
      sections: [
        {
          title: '概要',
          content:
            'Ark Studios LLC は、BitRemote アプリを商用アプリとして開発しました。このサービスは Ark Studios LLC によって提供され、そのままの形で使用されることを目的としています。\n\nこのページは、訪問者が個人情報の収集、使用、および開示に関する当社のポリシーについて知るためのものです。もし誰かが当社のサービスを利用することを決定した場合、当社のサービスを利用することを選択した場合、あなたはこのポリシーに関連する情報の収集および使用に同意したことになります。私たちが収集する個人情報は、サービスの提供および改善のために使用されます。私たちは、本方針に記述された場合を除き、あなたの情報を他者と共有または使用することはありません。\n\n本方針で使用される用語は、BitRemote でアクセス可能な私たちの利用規約において定義されたものと同じ意味を持ちます。それ以外の場合は、本方針で定義されます。',
        },
        {
          title: '情報の収集と使用',
          content:
            'サービスの使用をより良いものにするために、私たちはあなたから個人を特定できる情報の提供を求める場合があります。これには、個人情報の収集、広告配信、使用分析などが含まれますが、これに限定されません。私たちが要求する情報は、私たちによって保持され、本方針に記述されているように使用されます。\n\nアプリは、あなたを識別するために使用される情報を収集する可能性のある第三者サービスを使用しています。\n\nアプリによって使用される第三者サービスプロバイダーのプライバシーポリシーへのリンク:',
          links: thirdPartyPrivacyLinks,
        },
        {
          title: 'ログデータ',
          content:
            '私たちは、サービスを使用する際、アプリでエラーが発生した場合に、あなたの電話におけるデータおよび情報（第三者製品を通じて）を収集することをお知らせします。このログデータには、あなたのデバイスのインターネットプロトコル（「IP」）アドレス、デバイス名、オペレーティングシステムのバージョン、サービスを利用している際のアプリの設定、サービスの使用時の日時および日付、その他の統計情報が含まれる場合があります。',
        },
        {
          title: 'サービス提供者',
          content:
            '以下の理由により、第三者の企業や個人を雇用することがあります：\n\n・当社のサービスを容易にするため\n・当社の代わりにサービスを提供するため\n・サービス関連のサービスを実行するため\n・当社のサービスの使用方法を分析するのを助けるため\n\nこのサービスのユーザーに対して、これらの第三者が個人情報にアクセスできることをお知らせします。これは、当社に代わって彼らに割り当てられたタスクを実行するためです。しかし、他の目的で情報を開示または使用しないように義務付けられています。',
        },
        {
          title: 'セキュリティ',
          content:
            '私たちは、あなたの個人情報を提供することに対するあなたの信頼を大切にしており、それを保護するために商業的に受け入れられる手段を使用するよう努めています。しかし、インターネット上での伝送や電子的な保存方法が 100% 安全かつ信頼性のあるものではないことを覚えておいてください。私たちはその絶対的な安全を保証することはできません。',
        },
        {
          title: '他のサイトへのリンク',
          content:
            'このサービスには、他のサイトへのリンクが含まれている場合があります。第三者のリンクをクリックすると、そのサイトに移動します。これらの外部サイトは私たちによって運営されていませんので、これらのウェブサイトのプライバシーポリシーを確認することを強くお勧めします。私たちは、いかなる第三者のサイトやサービスの内容、プライバシーポリシー、または慣行についても、制御することなく、責任を負いません。',
        },
        {
          title: '子どものプライバシー',
          content:
            'これらのサービスは、13歳未満の方を対象としていません。私たちは意図的に13歳未満の子どもから個人を特定できる情報を収集しません。13歳未満の子どもが私たちに個人情報を提供したことが判明した場合、直ちに当社のサーバーからその情報を削除します。あなたが親または保護者で、あなたの子どもが私たちに個人情報を提供したことを知っている場合は、必要な措置を講じるために私たちに連絡してください。',
        },
        {
          title: '紛争について',
          content:
            '本方針は、日本国の法律に従って解釈または適用されるものとします。また、本方針に関する紛争については、その訴額に応じて東京簡易裁判所または東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
        },
        {
          title: '個人情報保護方針の変更',
          content:
            '私たちは時々、個人情報保護方針を更新することがあります。したがって、変更については定期的にこのページを見直すことをお勧めします。新しい個人情報保護方針をこのページに掲載することによって変更をお知らせします。\n\nこのポリシーは 2024 年 7 月 9 日から有効です。',
        },
        {
          title: 'お問い合わせ',
          content:
            '当社の個人情報保護方針に関して質問や提案がある場合は、support@bitremote.app まで遠慮なくお問い合わせください。',
        },
      ],
    },
    eula: {
      kind: 'eula',
      title: 'BitRemote エンドユーザー使用許諾契約',
      eyebrow: '法務',
      intro: 'BitRemote の利用に適用されるライセンス条件を定めます。',
      contentsLabel: 'EULA の項目',
      sections: [
        {
          title: 'エンドユーザー使用許諾契約（EULA）の同意と優先順位',
          content:
            'このライセンスアプリケーションの使用により、ユーザーは本 EULA および Apple の標準 EULA (https://www.apple.com/legal/internet-services/itunes/dev/stdeula) の条項に同意するものとします。本契約は Apple の標準 EULA を補完し、矛盾または対立が生じる場面でこれに優先します。Apple の標準 EULA の全ての条項が有効とされる中で、本契約によって明示的に変更される部分を除きます。ユーザーは、このライセンスアプリケーションの使用に関連するすべての目的において、本契約が Apple の標準 EULA に優先することを認識し同意します。',
        },
        {
          title: 'プラットフォーム間での同時使用の制限',
          content:
            'ユーザーは、所有または管理下にある無制限のデバイスでライセンスアプリケーションを使用する権利が付与されます。ただし、Apple のプラットフォーム（iOS、iPadOS、macOS、watchOS、tvOS、visionOS を含む）ごとに、同時に 3 台を超えるデバイスでライセンスアプリケーションを使用することはできません。同一プラットフォームで 3 台を超えるデバイスでアプリケーションが同時にアクティベートされた場合、最も早くアクティベートされたデバイスが自動的に非アクティベートされます。ユーザーは、この同時使用の制限が各 Apple プラットフォームごとに別々に適用されることを認識し、同意します。',
        },
        {
          title: '一度購入プラン',
          content:
            'BitRemote+ Advanced は、一度のご購入で、購入時点でアプリ内にて提供されている限定機能をご利用いただけるプランです。継続してご利用いただけるかどうかは、アプリの提供が継続されること、および対応プラットフォームや対応デバイスとの互換性が維持されることに依存します。機能やサービスは、今後変更または終了となる場合があります。',
        },
        {
          title: '英語版の優先',
          content:
            '本契約の英語版とその翻訳版との間に矛盾または対立が生じる場合、英語版が優先されます。この条項は、翻訳の違いから生じる可能性のある法的な曖昧さを明確にし、回避することを目的としています。ユーザーは、本契約の英語版が使用条件の解釈において決定的なバージョンであることを認識し、同意します。',
        },
        {
          title: '紛争について',
          content:
            '本契約は、日本国の法律に従って解釈または適用されるものとします。また、本契約に関する紛争については、その訴額に応じて東京簡易裁判所または東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
        },
        {
          title: 'EULA の変更',
          content:
            '私たちは時々、EULA を更新することがあります。したがって、変更については定期的にこのページを見直すことをお勧めします。新しい EULA をこのページに掲載することによって変更をお知らせします。\n\nこの契約は 2024 年 7 月 9 日から有効です。\n最終更新日：2026 年 3 月 20 日',
        },
        {
          title: 'お問い合わせ',
          content:
            '当社の EULA に関して質問や提案がある場合は、support@bitremote.app まで遠慮なくお問い合わせください。',
        },
      ],
    },
    scta: sctaDisclosureDocuments.ja,
  },
  'zh-hant': {
    privacy: {
      kind: 'privacy',
      title: 'BitRemote 隱私權政策',
      eyebrow: '法律文件',
      intro: '本政策說明 Ark Studios LLC 如何處理與 BitRemote 相關的資訊。',
      contentsLabel: '隱私權政策章節',
      sections: [
        {
          title: '概覽',
          content:
            'Ark Studios LLC 將 BitRemote App 建置為商業 App。本服務由 Ark Studios LLC 提供，並以現狀供使用者使用。\n\n本頁旨在告知訪客，如果有人決定使用我們的服務，我們在收集、使用與揭露個人資訊方面的政策。\n\n如果你選擇使用我們的服務，即表示你同意我們依本政策收集與使用相關資訊。我們收集的個人資訊會用於提供與改善服務。除本隱私權政策所述情形外，我們不會與任何人分享或使用你的資訊。\n\n本隱私權政策中使用的詞彙，除非於本政策另有定義，均與 BitRemote 中可存取的條款與條件具有相同含義。',
        },
        {
          title: '資訊收集與使用',
          content:
            '為了提供更好的體驗，在你使用我們的服務時，我們可能會要求你提供某些可識別個人身分的資訊，包括但不限於個人資訊收集、廣告投放、使用情況分析。我們要求提供的資訊將由我們保留，並依本隱私權政策所述方式使用。\n\n本 App 會使用可能收集可用於識別你的資訊的第三方服務。\n\n本 App 所使用的第三方服務供應商隱私權政策連結：',
          links: thirdPartyPrivacyLinks,
        },
        {
          title: '記錄資料',
          content:
            '我們想告知你，每當你使用我們的服務時，如果 App 發生錯誤，我們會透過第三方產品收集你手機上的資料與資訊，稱為記錄資料。這些記錄資料可能包含你的裝置網際網路通訊協定（「IP」）位址、裝置名稱、作業系統版本、使用我們服務時的 App 設定、使用服務的時間與日期，以及其他統計資料。',
        },
        {
          title: '服務供應商',
          content:
            '我們可能會基於以下原因聘用第三方公司或個人：\n\n・協助提供我們的服務；\n・代表我們提供服務；\n・執行與服務相關的服務；或\n・協助我們分析服務的使用情況。\n\n我們想告知本服務的使用者，這些第三方可存取其個人資訊。原因是為了代表我們執行指派給他們的工作。不過，他們有義務不得為任何其他目的揭露或使用這些資訊。',
        },
        {
          title: '安全性',
          content:
            '我們重視你在提供個人資訊時給予我們的信任，因此會努力採用商業上可接受的方式保護資訊。但請記住，透過網際網路傳輸或以電子方式儲存的方法，沒有任何一種是 100% 安全且可靠的，我們無法保證其絕對安全。',
        },
        {
          title: '連往其他網站的連結',
          content:
            '本服務可能包含連往其他網站的連結。如果你點選第三方連結，將會被導向該網站。請注意，這些外部網站並非由我們營運。因此，我們強烈建議你查看這些網站的隱私權政策。我們無法控制任何第三方網站或服務的內容、隱私權政策或做法，也不對其承擔任何責任。',
        },
        {
          title: '兒童隱私',
          content:
            '本服務並不面向 13 歲以下人士。我們不會故意收集 13 歲以下兒童的可識別個人身分資訊。若我們發現 13 歲以下兒童向我們提供了個人資訊，我們會立即從伺服器刪除該資訊。如果你是父母或監護人，並知道你的孩子向我們提供了個人資訊，請聯絡我們，以便我們採取必要措施。',
        },
        {
          title: '爭議',
          content:
            '本隱私權政策應依日本法律解釋與適用。此外，與本隱私權政策相關的爭議，應依請求金額，由東京簡易裁判所或東京地方裁判所作為第一審專屬合意管轄法院。',
        },
        {
          title: '本隱私權政策的變更',
          content:
            '我們可能會不時更新隱私權政策。因此，建議你定期查看本頁以了解任何變更。我們會透過在本頁發布新的隱私權政策來通知你任何變更。\n\n本政策自 2024-07-09 起生效。',
        },
        {
          title: '聯絡我們',
          content:
            '如果你對我們的隱私權政策有任何問題或建議，請隨時透過 support@bitremote.app 與我們聯絡。',
        },
      ],
    },
    eula: {
      kind: 'eula',
      title: 'BitRemote 最終使用者授權合約',
      eyebrow: '法律文件',
      intro: '本合約定義使用 BitRemote 時適用的授權條款。',
      contentsLabel: 'EULA 章節',
      sections: [
        {
          title: 'EULA 的同意與優先順序',
          content:
            '使用本授權應用程式，即表示你同意本最終使用者授權合約以及 Apple 標準 EULA（https://www.apple.com/legal/internet-services/itunes/dev/stdeula）的條款。本合約旨在補充 Apple 標準 EULA，並在發生差異或衝突時取代其相關條款。除本合約明確修改的部分外，Apple 標準 EULA 的所有條款仍然有效。你確認並同意，針對你使用本授權應用程式相關的所有目的，本合約優先於 Apple 標準 EULA。',
        },
        {
          title: '跨平台同時使用限制',
          content:
            '你可以在你擁有或控制的不限數量裝置上使用本授權應用程式。然而，在每個 Apple 平台（包括 iOS、iPadOS、macOS、watchOS、tvOS 與 visionOS）上，你不得同時在超過三台裝置使用本授權應用程式。如果同一平台上同時啟用本應用程式的裝置超過三台，最早啟用的裝置將會自動停用。你確認並同意，此同時使用限制會分別適用於每個 Apple 平台。',
        },
        {
          title: '一次性購買方案',
          content:
            'BitRemote+ Advanced 是一次性購買方案，可解鎖購買當時 App 內提供的專屬功能。能否持續使用取決於 App 是否持續提供，以及是否維持與支援平台和裝置的相容性。功能與服務未來可能變更或停止提供。',
        },
        {
          title: '英文版本優先',
          content:
            '如果本合約的英文版本與其翻譯版本之間有任何差異或衝突，應以英文版本為準。本條款旨在確保清楚性，並避免因翻譯差異產生法律上的歧義。你確認並同意，本合約的英文版本是解釋使用條款與條件時的最終版本。',
        },
        {
          title: '爭議',
          content:
            '本 EULA 應依日本法律解釋與適用。此外，與本 EULA 相關的爭議，應依請求金額，由東京簡易裁判所或東京地方裁判所作為第一審專屬合意管轄法院。',
        },
        {
          title: '本 EULA 的變更',
          content:
            '我們可能會不時更新 EULA。因此，建議你定期查看本頁以了解任何變更。我們會透過在本頁發布新的 EULA 來通知你任何變更。\n\n本政策自 2024-07-09 起生效。\n最後更新：2026-03-20。',
        },
        {
          title: '聯絡我們',
          content:
            '如果你對我們的 EULA 有任何問題或建議，請隨時透過 support@bitremote.app 與我們聯絡。',
        },
      ],
    },
    scta: sctaDisclosureDocuments['zh-hant'],
  },
  'zh-hans': {
    privacy: {
      kind: 'privacy',
      title: 'BitRemote 隐私权政策',
      eyebrow: '法律文档',
      intro: '本政策说明 Ark Studios LLC 如何处理与 BitRemote 相关的信息。',
      contentsLabel: '隐私权政策章节',
      sections: [
        {
          title: '概览',
          content:
            'Ark Studios LLC 将 BitRemote 应用作为商业应用构建。本服务由 Ark Studios LLC 提供，并按现状供用户使用。\n\n本页面用于告知访问者，如果有人决定使用我们的服务，我们在收集、使用和披露个人信息方面的政策。\n\n如果你选择使用我们的服务，即表示你同意我们依本政策收集和使用相关信息。我们收集的个人信息会用于提供和改进服务。除本隐私权政策所述情形外，我们不会与任何人分享或使用你的信息。\n\n本隐私权政策中使用的术语，除非在本政策中另有定义，均与 BitRemote 中可访问的条款和条件具有相同含义。',
        },
        {
          title: '信息收集与使用',
          content:
            '为了提供更好的体验，在你使用我们的服务时，我们可能会要求你提供某些可识别个人身份的信息，包括但不限于个人信息收集、广告投放、使用情况分析。我们要求提供的信息将由我们保留，并依本隐私权政策所述方式使用。\n\n本应用会使用可能收集可用于识别你的信息的第三方服务。\n\n本应用所使用的第三方服务提供商隐私权政策链接：',
          links: thirdPartyPrivacyLinks,
        },
        {
          title: '日志数据',
          content:
            '我们想告知你，每当你使用我们的服务时，如果应用发生错误，我们会通过第三方产品收集你手机上的数据和信息，称为日志数据。这些日志数据可能包括你的设备互联网协议（“IP”）地址、设备名称、操作系统版本、使用我们的服务时的应用配置、使用服务的时间和日期，以及其他统计数据。',
        },
        {
          title: '服务提供商',
          content:
            '我们可能会基于以下原因聘用第三方公司或个人：\n\n・协助提供我们的服务；\n・代表我们提供服务；\n・执行与服务相关的服务；或\n・协助我们分析服务的使用情况。\n\n我们想告知本服务的用户，这些第三方可以访问其个人信息。原因是为了代表我们执行分配给他们的任务。不过，他们有义务不得为任何其他目的披露或使用这些信息。',
        },
        {
          title: '安全性',
          content:
            '我们重视你在提供个人信息时给予我们的信任，因此会努力采用商业上可接受的方式保护信息。但请记住，通过互联网传输或以电子方式存储的方法，没有任何一种是 100% 安全且可靠的，我们无法保证其绝对安全。',
        },
        {
          title: '链接到其他网站',
          content:
            '本服务可能包含链接到其他网站的链接。如果你点击第三方链接，将会被导向该网站。请注意，这些外部网站并非由我们运营。因此，我们强烈建议你查看这些网站的隐私权政策。我们无法控制任何第三方网站或服务的内容、隐私权政策或做法，也不对其承担任何责任。',
        },
        {
          title: '儿童隐私',
          content:
            '本服务并不面向 13 岁以下人士。我们不会故意收集 13 岁以下儿童的可识别个人身份信息。若我们发现 13 岁以下儿童向我们提供了个人信息，我们会立即从服务器删除该信息。如果你是父母或监护人，并知道你的孩子向我们提供了个人信息，请联系我们，以便我们采取必要措施。',
        },
        {
          title: '争议',
          content:
            '本隐私权政策应依日本法律解释和适用。此外，与本隐私权政策相关的争议，应根据请求金额，由东京简易裁判所或东京地方裁判所作为第一审专属合意管辖法院。',
        },
        {
          title: '本隐私权政策的变更',
          content:
            '我们可能会不时更新隐私权政策。因此，建议你定期查看本页以了解任何变更。我们会通过在本页发布新的隐私权政策来通知你任何变更。\n\n本政策自 2024-07-09 起生效。',
        },
        {
          title: '联系我们',
          content:
            '如果你对我们的隐私权政策有任何问题或建议，请随时通过 support@bitremote.app 与我们联系。',
        },
      ],
    },
    eula: {
      kind: 'eula',
      title: 'BitRemote 最终用户许可协议',
      eyebrow: '法律文档',
      intro: '本协议定义使用 BitRemote 时适用的许可条款。',
      contentsLabel: 'EULA 章节',
      sections: [
        {
          title: 'EULA 的同意与优先顺序',
          content:
            '使用本许可应用程序，即表示你同意本最终用户许可协议以及 Apple 标准 EULA（https://www.apple.com/legal/internet-services/itunes/dev/stdeula）的条款。本协议旨在补充 Apple 标准 EULA，并在发生差异或冲突时取代其相关条款。除本协议明确修改的部分外，Apple 标准 EULA 的所有条款仍然有效。你确认并同意，针对你使用本许可应用程序相关的所有目的，本协议优先于 Apple 标准 EULA。',
        },
        {
          title: '跨平台同时使用限制',
          content:
            '你可以在你拥有或控制的不限数量设备上使用本许可应用程序。然而，在每个 Apple 平台（包括 iOS、iPadOS、macOS、watchOS、tvOS 和 visionOS）上，你不得同时在超过三台设备上使用本许可应用程序。如果同一平台上同时启用本应用程序的设备超过三台，最早启用的设备将会自动停用。你确认并同意，此同时使用限制会分别适用于每个 Apple 平台。',
        },
        {
          title: '一次性购买方案',
          content:
            'BitRemote+ Advanced 是一次性购买方案，可解锁购买当时应用内提供的专属功能。能否持续使用取决于应用是否持续提供，以及是否维持与支持平台和设备的兼容性。功能与服务未来可能变更或停止提供。',
        },
        {
          title: '英文版本优先',
          content:
            '如果本协议的英文版本与其翻译版本之间有任何差异或冲突，应以英文版本为准。本条款旨在确保清晰性，并避免因翻译差异产生法律上的歧义。你确认并同意，本协议的英文版本是解释使用条款与条件时的最终版本。',
        },
        {
          title: '争议',
          content:
            '本 EULA 应依日本法律解释和适用。此外，与本 EULA 相关的争议，应根据请求金额，由东京简易裁判所或东京地方裁判所作为第一审专属合意管辖法院。',
        },
        {
          title: '本 EULA 的变更',
          content:
            '我们可能会不时更新 EULA。因此，建议你定期查看本页以了解任何变更。我们会通过在本页发布新的 EULA 来通知你任何变更。\n\n本政策自 2024-07-09 起生效。\n最后更新：2026-03-20。',
        },
        {
          title: '联系我们',
          content:
            '如果你对我们的 EULA 有任何问题或建议，请随时通过 support@bitremote.app 与我们联系。',
        },
      ],
    },
    scta: sctaDisclosureDocuments['zh-hans'],
  },
} as const satisfies Record<Locale, Record<LegalDocumentKind, LegalDocument>>;

export function getLegalDocument(locale: Locale, kind: LegalDocumentKind): LegalDocument {
  return legalDocuments[locale][kind];
}
