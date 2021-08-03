import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import moment from 'moment'
import * as Print from 'expo-print'
import * as MailComposer from 'expo-mail-composer'

// CONFIG
import colors from '../../config/colors'

// COMPONENTS
import Screen from '../../components/Screen'
import AppButton from '../../components/AppButton'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import SignatureModal from '../../components/SignatureModal'

// MODELS
import PactModel from '../../api/pacts'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

export default function ReviewContract({ navigation }) {
  const htmlObj = {
    date: moment().format('MMMM Do YYYY'),
    perfAddress: [],
    perfInfoSpan: [],
    perfCompany: [],
    perfNameDiv: [],
    perfSignDiv: [],
    perfSignature: [],
    prodSignature: [],
  }

  currentPact.performers.map((performer) => {
    let performerAddress = /*html*/ `
      <div>${performer.companyName} f/s/o</div>
      <div>${performer.name} p/k/a ${performer.artistName}</div>
      <div>${performer.address}</div>
      <div>${performer.city}, ${performer.state} ${performer.zipCode}</div>
      `
    let performerInfo = /*html*/ `
        <span>
          ${performer.companyName} f/s/o ${performer.name} p/k/a
          "${performer.artistName}" /
        </span>
      `
    let performerCompany = /*html*/ `
        <span>${performer.companyName}</span>
      `

    let perfName = /*html*/ `
        <div class="legal-name">${performer.name}</div>
      `

    let perfSigHeader = /*html*/ `
      <div class='flex' style='flex-direction:column'>
        <div>${performer.companyName} f/s/o</div>
        <div>${performer.name} p/k/a</div>
        <div>“${performer.artistName}”</div>
      </div>
      `
    let perfSig = /*html*/ `
      <img class='signature-img' src="${performer.signatureImg}"/>
    `

    let prodSig = /*html*/ `
      <img class='signature-img' src="${currentPact.producer.signatureImg}"/>
    `

    htmlObj.perfAddress.push(performerAddress)
    htmlObj.perfInfoSpan.push(performerInfo)
    htmlObj.perfCompany.push(performerCompany)
    htmlObj.perfNameDiv.push(perfName)
    htmlObj.perfSignDiv.push(perfSigHeader)
    htmlObj.perfSignature.push(perfSig)
    htmlObj.prodSignature.push(prodSig)
  })

  const generateHTML = (htmlObj) => {
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contract</title>
        <style>
          @page {
            margin: 20px;
            break-inside: avoid
          }
  
          body {
            padding: 20px;
            break-inside: avoid;
          }
  
          .regard-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
            font-weight: bold;
          }
  
          .re {
            padding-left: 15px; 
          }

          .regard-content {
            display: flex;
          }
  
          .regard-ppl {
            margin-left: 30px;
          }
  
          .body {
            text-indent: 25px;
            margin: 20px 0;
          }
  
          .body-title {
            font-weight: bold;
            text-decoration: underline;
            margin: 0 10px;
          }
  
          .body-sub {
            text-indent: 60px;
            margin: 20px 0;
          }
  
          .sub-letter {
            margin-right: 20px;
          }
  
  
          table,
          th,
          td {
            border: 1px solid black;
            border-collapse: collapse;
            font-size: 12px;
          }
  
          .signature-header {
            text-indent: 30px;
            margin: 10px 0;
          }
  
          .signature-img {
            display: flex;
            width: 130px;
            height: 50px;
            /* border: none; */
            outline: none;
            text-decoration: none;
            border-bottom: 1px black solid
          }

          .div {
            margin: 20px 0;
          }

          .flex {
            display: flex;
          }

          .flex-start {
            display: flex;
            justify-content: flex-start;
            margin: 20px 0;
          }

          .flex-center {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }

          .flex-end {
            display: flex;
            margin: 20px 0;
            justify-content: flex-end;
          }
  
          .legal-name {
            width: fit-content;
            border-bottom: 1px solid #000;
            margin: 15px 0 5px;
          }
        </style>
      </head>
  
      <body>

        <div class="flex-center" style='flex-direction:column; align-items:center'>
          ${htmlObj.perfAddress}
        </div>

        <div class="flex-end">
          <div>Date as of: ${htmlObj.date}</div>
        </div>

        <div class="div">
          <div>${currentPact.producer.companyName} f/s/o</div>
          <div>${currentPact.producer.name} p/k/a ${currentPact.producer.artistName}</div>
          <div>${currentPact.producer.address}</div>
          <div>${currentPact.producer.city}, ${currentPact.producer.state} ${currentPact.producer.zipCode} </div>
        </div>

        <div class="regard-container">
          <div class="regard-content">
            <div class='re'>Re:</div>
            <div class='regard-ppl'>
                ${htmlObj.perfInfoSpan} ${currentPact.producer.companyName} f/s/o ${currentPact.producer.name} ${currentPact.producer.lastName}  p/k/a “${currentPact.producer.artistName}” - Producer Agreement
            </div>
          </div>
        </div>

        <div class="div">
          <div>Gentlepersons:</div>
        </div>

        <div class="body">
          The following, when duly signed by the parties hereto, sets forth the agreement (the “Agreement”) between ${currentPact.producer.companyName} f/so ${currentPact.producer.name} p/k/a ${currentPact.producer.artistName} (hereinafter referred to collectively as the “Producer”) and ${htmlObj.perfInfoSpan} (hereinafter referred to collectively as the “Artist”) regarding Producer’s non-exclusive services in connection with producing and mixing one (1) master recording (the “Master”) embodying the performances of Artist of the musical composition (“Composition”) tentatively entitled “${currentPact.recordTitle}” . The Master is intended for potential inclusion on Artist’s forthcoming album (the “Album”) to be delivered by Artist to ${currentPact.labelName} or their successor (“Record Company”) pursuant to the recording agreement between Artist and Record Company dated as of ${htmlObj.date}, as amended (the “Recording Agreement”) The parties acknowledge that only those versions of the Master featuring the production or mixing, as applicable, services of Producer shall constitute the Master hereunder.
        </div>

        <div class="body">
          1. <span class="body-title">Recording Procedure. </span> All recording
          and mixing shall be conducted according to the mutually agreed upon
          procedures and reasonable directions of Artist and Record Company, and
          Producer shall render all services customarily rendered by producers and
          mixers of phonograph records in a first class, professional manner,
          including the maintenance and submission of job sheets, Form Bs and
          other materials reasonably required by Artist to comply with Artist’s
          union obligations. The Master shall be commercially and technically
          satisfactory to Artist and Record Company, and Producer shall at Record
          Company’s or Artist’s request re-record and re-mix the Master until the
          Master is commercially and technically satisfactory to Record Company
          and Artist. Producer shall prepare and submit for Artist’s and Record
          Company’s approval a recording budget. Artist and Record Company hereby
          acknowledge satisfactory delivery and acceptance of the Master by Artist
          and Record Company and completion of all of the Producer’s services
          hereunder, provided that the foregoing acknowledgment shall not in any
          way prejudice or constitute a waiver of any of Artist’s or Record
          Company’s rights hereunder (i) in the event of any breach of Producer’s
          representations, warranties or covenants set forth in this Agreement or
          (ii) to otherwise require the complete and proper performance of all of
          Producer’s obligations hereunder.
        </div>

        <div class="body">
          2. <span class="body-title">Grant of Rights. </span> As between
          Producer, on the one hand, and Artist, on the other hand, Artist shall
          exclusively own the Master (excluding the underlying musical
          composition(s)) as a so-called “work-for-hire”, and all rights therein,
          including, without limitation, copyrights and all renewals and
          extensions thereof, free from any claims by Producer or any person or
          entity deriving rights or interest from Producer. In the event it is
          determined that Artist does not own such results and proceeds as a
          work-for-hire, then Producer hereby assign to Artist all of the
          foregoing rights. Artist and Artist’s designees may exploit all of the
          foregoing in any media, whether now known or hereafter devised, in
          perpetuity throughout the world. Producer shall, upon Artist’s or Record
          Company’s reasonable written request, execute and deliver to Artist
          and/or Record Company any assignments of copyright (including renewals
          and extensions thereof) in and to the Master as Artist or Record Company
          may deem necessary, and if Producer fails to execute and deliver to
          Artist or Record Company such assignments of copyright within five (5)
          business days after Producer’s receipt of written request therefor,
          Producer hereby irrevocably appoint Artist as Producer’s limited
          attorney-in-fact solely for the purpose of executing such assignments.
          Artist shall provide you with copies of all such documents executed by
          Artist on Producer’s behalf. Producer hereby expressly waives any and
          all rights, at law or otherwise, which Producer may have or claims to
          have based upon, or as a result of any alleged infringement of,
          Producer’s so-called "moral rights of authors". Without limiting the
          generality of the foregoing, Artist and Record Company shall have the
          right to re-record, edit, mix and re-mix, dub and re-dub the Master in
          all media in Artist’s and Record Company’s sole discretion.
          Notwithstanding anything to the contrary, nothing contained herein shall
          be deemed to obligate Artist or Record Company to actually embody or
          release the Master on the Album or any other phonograph records.
        </div>

        <div class="body">
          <div class="flex">
            3. <span class="body-title">Royalties</span>
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> In consideration of Producer’s
            services hereunder in connection with the Master, Artist shall
            authorize Record Company to pay to Producer via a letter of direction
            in the form attached hereto as Exhibit A, a royalty (the “Producer
            Royalty”) equal to [PRODUCER ROYALTY WRITTEN OUT] percent ${currentPact.producer.royaltyPercent} of any gross royalties (including, without
            limitation, with respect to audio-visual exploitations, flat fee/net
            receipt monies, etc.) payable to the Artist solely in connection with
            the Master and any exploitation thereof, computed, adjusted,
            calculated, reduced and paid in the same manner, on the same basis,
            and at the same times as the royalty payable to the Artist under the
            Recording Agreement.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(b)</span> Notwithstanding anything to the
            contrary contained herein, no royalty shall be payable hereunder
            unless and until Record Company recoups at the “net artist rate”
            (i.e., the “all in” royalty payable to Artist in respect of the Master
            less the royalty rate payable to Producer) all recording costs (as
            defined in the Recording Agreement but excluding the Advance
            (hereinafter defined), any in-pocket advances to Artist) attributable
            to the Master. Following such recoupment, Producer's royalties shall
            be paid retroactively to the first record sold or first exploitation
            of the Master, subject to the recoupment of the Advance. The Producer
            Royalty on a record embodying the Master together with other
            recordings will be computed by multiplying the Producer Royalty
            otherwise applicable by a fraction, the numerator of which is the
            number of sides embodying Masters and the denominator of which is the
            total number of royalty-bearing sides contained on such record.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(c)</span> If Artist receives any monies or
            is credited with any monies against advances previously received from
            persons or entities other than Record Company (“Defined Third
            Parties”) which are attributable to the exploitation of the Master,
            including by way of example monies paid by SoundExchange, PPL or any
            other collection agency outside the U.S., AARC or any other Defined
            Third Party making payments in connection with either digital or
            terrestrial performing rights in masters or blank recording media
            levies (but specifically excluding monies paid to or credited to us
            from the exploitation of the musical composition embodied in the
            Master), Artist shall pay to Producer an amount equal to the total
            amount of such monies received by Artist (or credited to against a
            previously received advance), multiplied by the Fraction; and the
            provisions in this agreement regarding Artist’s accounting, audit and
            audit recovery obligations to Producer shall apply to such monies. If
            Artist becomes a member of SoundExchange, Artist shall instruct Sound
            Exchange and in any event will instruct all other applicable third
            parties to account directly to Producer at the same time and subject
            to the same conditions pursuant to which it accounts to Artist. Artist
            shall also execute, at Producer’s request, PPL’s “Eligible Studio
            Producer Form” or any other document(s) accepted by any third party
            outside the U.S. which collects public performance income derived from
            the Masters.
          </div>
        </div>

        <div class="body">
          <div class="flex">
            4. <span class="body-title">Accounting</span>
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> Artist shall irrevocably instruct
            Record Company pursuant to a letter of direction in the form of
            Exhibit “B” attached hereto and incorporated herein by this reference,
            to account directly to Producer at the same time and subject to the
            same conditions pursuant to which it accounts to Artist. If Record
            Company fails to so account to Producer and Producer notifies Artist
            of such failure, then Artist will account to Producer within thirty
            (30) days after Artist's receipt of the corresponding royalty
            statement from Record Company, and Artist will send to Producer a
            statement of royalties payable to Producer, if any, after deducting
            any and all unrecouped advances and chargeable costs under this
            Agreement and such amount, if any, which Artist may be required to
            withhold pursuant to any applicable statute, regulation or law. Each
            such statement shall include a copy of the relevant portions of the
            corresponding royalty statement received by Artist from Record
            Company. No royalty statement shall be required for any period during
            which no royalties are earned. Producer hereby agrees that, in
            rendering royalty statements hereunder, Artist shall have the
            unqualified right to rely on statements received from Record Company,
            and statements to Producer hereunder shall be deemed accurate and
            binding on Producer to the extent they are accurate based on
            statements received by Artist from Record Company.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(b)</span> Producer may, at Producer’s own
            expense, audit Artist’s books and records directly relating to this
            Agreement that report the sales of records for which royalties are
            payable hereunder. Producer may make such audit only for the purpose
            of verifying the accuracy of statements sent to him hereunder and only
            as provided herein. Producer shall have the right to audit said books
            by notice to Artist at least thirty (30) days prior to the date
            Producer intends to commence an audit. Said audit shall be conducted
            by a reputable independent certified public accountant experienced in
            recording industry audits, conducted in such a manner so as not to
            disrupt Artist’s activities, and completed promptly. Producer may make
            such an examination for a particular statement only once and only
            within twenty-four (24) months after the date any such statement is
            rendered. Producer shall be deemed to have consented to all
            accountings by Artist or Record Company, and said accountings shall be
            binding upon Producer and shall not be subject to any objection for
            any reason unless specific objection, in writing, stating the basis
            thereof, is given to Artist within twenty-four (24) months after the
            date any such statement is rendered. Producer shall not have the right
            to sue or otherwise commence any action against Artist in connection
            with any particular statement rendered or required to be rendered
            hereunder unless Producer has objected to a particular statement as
            set forth herein and Artist has given Producer notice that Artist
            denies the validity of the objection and Producer has filed such suit
            within six (6) months after Artist gives Producer notice denying the
            validity of Producer’s objections. If Artist conducts an audit of
            Record Company that results in a net recovery, then Producer shall be
            entitled to pro-rata share thereof (i.e., attributable to the Master
            hereunder) after deducting from the gross proceeds actually received
            by (or credited to) Artist as a result of such audit all documented
            out of pocket third party costs and expenses incurred in connection
            with such audit, including, without limitation, reasonable accounting
            fees, audit fees and legal fees.
          </div>
        </div>

        <div class="body">
          5. <span class="body-title">Advance.</span> Conditioned upon Producer’s
          performance of all of the material terms and conditions hereof and in
          consideration for all services rendered by Producer in connection with
          the Master, Artist shall pay or cause Record Company to pay to Producer
          an advance (“Advance”) in the amount of ${currentPact.producer.advancePercent}[DOLLAR AMOUNT] ($XX) with
          respect to the Master. The Advance is fully recoupable from any and all
          royalties payable to Producer hereunder (excluding publishing
          royalties). The Advance shall be payable promptly following the later
          of: (a) full execution of this Agreement; and (b) Artist’s and Record
          Company’s acknowledgement of satisfactory delivery and acceptance of the
          Master. Save for any royalties due under paragraphs 3 and 7 and any
          monies which Producer may be entitled to under any collective bargaining
          agreement, Producer hereby acknowledges that the Advance is the totality
          of the consideration to which Producer (and any third party engaged by
          Producer) shall be entitled for Producer’s services in connection with
          the Master.
        </div>

        <div class="body">
          <div class="flex">
            6. <span class="body-title">Name & Likeness / Credit.</span>
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> Producer hereby grants to Artist
            and Record Company the right to use Producer’s name, likeness and
            biographical materials solely in connection with the sale, advertising
            and promotion of the Album and other records derived from the Master.
            Producer will have a right of approval for all photographs, likenesses
            and biographical material concerning Producer used by Artist or Record
            Company in connection therewith, which approval will not be
            unreasonably withheld and will be deemed to have been given within
            five (5) business days following Artist’s or Record Company’s request
            therefor, unless Producer notifies Artist or Record Company to the
            contrary within said five (5) business day period. Artist’s or Record
            Company’s inadvertent failure to obtain Producer’s approval shall not
            be deemed a breach hereof. Upon receipt of written notice from
            Producer regarding any such failure, Artist shall instruct Record
            Company to prospectively correct any such failure in connection with
            future manufacturing runs.
          </div>

          <div class="body-sub">
            <span class="sub-letter">(b)</span> Artist will use reasonable efforts
            and instruct Record Company, pursuant to Record Company’s standard
            credit policies and practices, to accord credit with respect to the
            Master produced and delivered in accordance with the material terms
            and provisions hereof substantially in the form:
          </div>

          <div class="flex-center" style='margin-right:25px'>
            <div>“Produced by: ${currentPact.producer.artistName}.”</div>
          </div>

          <div class="body-sub">
            <span class="sub-letter">(c)</span> Artist shall use reasonable
            efforts and instruct Record Company to accord Producer the
            aforementioned credits in (i) the liner notes of records in all
            configurations embodying a Master produced hereunder, (ii)
            intentionally omitted without implication; (iii) metadata information
            to the extent allowed by any third party service or organization; (iv)
            solely with respect to a Master, in all one-half (1/2) page or larger
            advertisements (including Billboard “strip ads,” but specifically
            excluding advertisements of an institutional nature or advertisements
            producing solely the cover of any phonorecord embodying such Master)
            placed by Record Company or under Record Company’s control in the
            United States in so-called trade and consumer publications, which
            advertisements pertain solely to phonorecords embodying a Master; and,
            (v) no less in size or prominence in the event that any third party
            producers or mixers are credited in respect of the Master or the
            applicable record. Artist shall also have the right to accord credit
            to any other individuals rendering services with respect to a Master
            hereunder. No inadvertent failure by Company, Artist or any third
            party to comply with the foregoing credit provision shall constitute a
            breach of this Agreement, and in no event shall Producer seek or be
            entitled to injunctive or other equitable relief for failure to comply
            with any of the credit provisions hereof. Upon Company’s receipt of
            Producer’s notice of such inadvertent failure, Artist shall instruct
            Record Company to prospectively cure any such failure on future
            manufacturing runs.
          </div>
        </div>

        <div class="body">
          <div class="flex">
            7. <span class="body-title">Songwriting/Music Publishing.</span>
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> The parties hereby acknowledge and
            agree that the copyright interests and authorship of the Composition
            shall be allocated as follows:
            <div class="flex-center">
              <table>
                <thead>
                  <th>Writer</th>
                  <th>Publishing Share</th>
                  <th>Publisher</th>
                </thead>
                <tbody>
                  <tr>
                    <td>[WRITER 1 LEGAL NAME]</td>
                    <td>[]%</td>
                    <td>[WRITER 1 PUBLISHER]</td>
                  </tr>
                  <tr>
                    <td>[WRITER 2 LEGAL NAME]</td>
                    <td>[]%</td>
                    <td>[WRITER 2 PUBLISHER]</td>
                  </tr>
                  <tr>
                    <td>[WRITER 3 LEGAL NAME]</td>
                    <td>[]%</td>
                    <td>[WRITER 3 PUBLISHER]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="body-sub">
            <span class="sub-letter">(b)</span> Each party (or its music
            publishing designee) shall administer and exploit only its respective
            ownership share of the Composition and shall not administer or exploit
            any other party’s respective ownership share of the Composition.
            Notwithstanding the foregoing, Producer hereby licenses (and shall
            cause Producer’s music publishing designee(s) to license) Producer’s
            share of the Composition proportionately on the same terms and
            conditions as musical compositions which are owned and controlled by
            Artist are licensed to Record Company by Artist under the Recording
            Agreement (including, without limitation, first use mechanical
            licenses, reduced royalty rates (if any), free licenses, reserves,
            so-called "mechanical caps," and other uses) provided, however, use of
            the Composition shall not be less than the per-song royalty rate equal
            to one hundred percent (100%) of the applicable minimum statutory rate
            in effect as of the date of release of the applicable record
            concerned. All of the terms and conditions set forth in this paragraph
            7 are granted on a so-called “most favored nations” basis with the
            co-writers and co-publishers of the Composition. Without limiting the
            generality of the foregoing, Producer agree to issue (and will cause
            Producer’s music publishing designee(s) to issue) to Artist and Record
            Company, a first use mechanical license for Producer’s share of the
            Composition.
          </div>
        </div>

        <div class="body">
          8. <span class="body-title">Re-Recording Restriction.</span> Producer
          shall not re-record or produce for any other individual or entity any
          master recording embodying a composition which is embodied in the Master
          for a period of five (5) years after the delivery of such Master
          hereunder.
        </div>

        <div class="body">
          <div class="flex">
            9. <span class="body-title">Representations & Warranties / Indemnity.</span>
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> Producer warrants, represents and
            agrees that (i) Producer has the right to enter into this Agreement,
            perform the services to be performed hereunder, and grant the rights
            granted by Producer herein; (ii) Producer is not subject to any
            contractual restriction or prohibition that would impair Producer's
            performance of any of their services and material obligations
            contained herein; (iii) no materials furnished or created by Producer
            which are contained in the Master shall infringe upon or violate the
            rights of any third party; and, (iv) Producer shall not, without
            Artist’s prior, written consent, include or embody any so-called
            “sample” furnished or contributed b Producer in any Master hereunder.
            Producer hereby indemnifies and holds Artist and Record Company
            harmless from and against any and all damages, liabilities, loss,
            costs or expenses (including, without limitation, reasonable outside
            attorneys' fees) arising out of third party claims in connection with
            any breach by Producer of any of the warranties, representations or
            agreements made by Producer herein provided such claims are reduced to
            final judgment adverse to Artist and Record Company by a court of law
            or settled with Producer’s prior written approval (which approval
            shall not be unreasonably withheld or delayed), provided that such
            approval shall not be required with respect to any settlement of Ten
            Thousand Dollars ($10,000) or less. Producer shall have the right, at
            its own expense, to participate in the defense of any lawsuit,
            provided that Artist shall have the right to retain control over the
            conduct thereof. Producer shall reimburse Artist on demand for any
            payment made by Artist regarding an amount subject to the foregoing
            indemnity. Pending the outcome of any claim to which the foregoing
            indemnity applies, Artist or Record Company shall have the right to
            withhold from monies otherwise payable to Producer an amount which, in
            Artist’s good faith business judgment, is sufficient to cover the
            amount of the claim involved (as well as costs and reasonable outside
            attorney's fees). If no suit is filed and no settlement negotiations
            are pending within one (1) year after Artist receives notice of a
            particular claim, then Artist shall release any such withheld sums in
            respect of such claim (or shall instruct Record Company to do so);
            provided, however, that if such claim is subsequently revived, then
            Company shall once again have the right to withhold monies hereunder
            in respect of such claim. If Artist pays more than Ten Thousand
            Dollars ($10,000) in settlement of any claim not reduced to judgement,
            Producer will not be obligated to reimburse Artist for the excess
            unless Producer has consented in writing to the settlement, except as
            provided for in the next sentence. If Producer does not consent to a
            settlement proposed by Artist for an amount exceeding Ten Thousand
            Dollars ($10,000), Producer will nevertheless be required to reimburse
            Artist for the full amount paid unless Producer makes bonding
            arrangements satisfactory to Artist in Artist’s sole discretion, to
            assure Artist of reimbursement of all damages, liabilities, costs and
            expenses (including legal expenses and counsel fees) which Artist and
            Record Company may incur as a result of such claim.
          </div>

          <div class="body-sub">
            <span class="sub-letter">(b)</span> Artist warrants, represents and
            agrees that (i) Artist has the right to enter into this Agreement;
            and, (ii) no materials furnished or created by Artist which are
            contained in the Master shall infringe upon or violate the rights of
            any third party. Artist hereby indemnifies and holds Producer harmless
            from and against any and all damages, liabilities, loss, costs or
            expenses (including, without limitation, reasonable outside attorneys'
            fees) arising out of third party claims in connection with any breach
            by Artist of any of the warranties, representations or agreements made
            by Artist herein. Artist’s indemnity hereunder shall be limited to
            claims reduced to judgment by a court of law adverse to Producer and
            settlements entered into with Artist’s prior written consent (which
            consent shall not be unreasonably withheld or delayed), provided that
            such consent shall not be required with respect to any settlement of
            Ten Thousand Dollars ($10,000) or less.
          </div>
        </div>

        <div class="body">
          <div class="flex">
            10. <span class="body-title">Miscellaneous</span>.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(a)</span> Artist shall have the right to
            assign any of Artist rights or obligations hereunder in whole or in
            part provided that Artist remains primarily liable hereunder. Producer
            shall not have the right to assign any of Producer’s rights or
            obligations hereunder provided, however, that Producer shall be
            entitled to assign Producer’s right to receive money to an entity
            wholly owned or controlled by Producer, upon written notice to Artist
            in a form acceptable to Artist and Record Company.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(b)</span> All notices, statements and
            payments to be sent to Producer hereunder shall be addressed to
            Producer at the address set forth on the first page hereof or at such
            other address as Producer shall designate in writing from time to
            time. All notices to be given to Artist hereunder shall be addressed
            to Artist at the address set forth on the first page hereof or at such
            other address as Artist shall designate in writing from time to time.
            All notices shall be in writing and shall either be served by personal
            delivery (with written receipt of such delivery), or certified or
            registered mail, return receipt requested, all charges prepaid. Except
            as otherwise provided herein, such notices shall be deemed given when
            personally delivered, or five (5) days after mailing, except that
            notices of change of address shall be effective only after actual
            receipt.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(c)</span> Neither party shall be in breach
            of any of its obligations hereunder unless and until it receives from
            the other party written notice of any alleged breach and fails to cure
            any such breach within thirty (30) days after the date of such
            receipt. In no event whatsoever shall Producer have any right to seek
            or obtain injunctive relief against Artist or Record Company (and/or
            Artist’s or Record Company's respective licensees or assigns). In any
            action, suit or proceeding arising from or based upon this Agreement
            is brought by either party hereto against the other, then the
            prevailing party shall be entitled to recover from the other its
            reasonable outside attorneys’ fees in connection therewith in addition
            to the costs of such action, suit or proceeding.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(d)</span> Nothing contained herein shall
            constitute a partnership or a joint venture between Producer and
            Artist and it is acknowledged that Producer is performing Producer's
            services hereunder as an independent contractor (except for “work for
            hire” purposes pursuant to paragraph 2 above). Neither party hereto
            shall hold itself out contrary to the terms of this paragraph 11(d),
            and neither Producer nor Artist shall become liable for any
            representation, act or omission of the other contrary to the
            provisions hereof.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(e)</span> This Agreement sets forth the
            entire understanding between Producer and Artist with respect to the
            subject matter hereof and can only be modified by a written instrument
            signed by Producer and Artist.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(f)</span> No waiver by either party of any
            default hereunder shall affect such party’s rights thereafter to
            enforce such term or provision or exercise any right or remedy in the
            event of any other default, whether or not similar.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(g)</span> If any provision of this Agreement
            shall be held void, voidable, invalid or inoperative, no other
            provision of this contract shall be affected as a result thereof, and
            accordingly, the remaining provisions of this Agreement shall remain
            in full force and effect as though such void, voidable, invalid or
            inoperative provision had not been contained herein.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(h)</span> This Agreement is entered into in
            the State of New York and shall be construed in accordance with the
            laws of said state applicable to contracts to be wholly performed
            therein. The Courts located in New York State (State and Federal),
            shall have sole and exclusive jurisdiction over any controversies
            regarding, arising out of, or in connection with this agreement.
          </div>
          <div class="body-sub">
            <span class="sub-letter">(i)</span> The remedy available to Producer
            in the event of a breach hereof by Artist and/or Record Company shall
            be strictly limited to monetary damages as determined by a court of
            competent jurisdiction; without limiting the foregoing, in no event
            shall Producer be permitted to seek to enjoin the manufacture, sale
            distribution or exploitation of the Master by Record Company or by any
            of Record Company’s licensees
          </div>
          <div class="body-sub">
            <span class="sub-letter">(j)</span> This Agreement may be executed in
            one or more counterparts and by electronic signature, facsimile or
            electronic copy (email), and by the different parties hereto in
            separate counterparts, each of which when executed shall be deemed to
            be an original but all of which when taken together shall constitute
            one and the same fully binding Agreement.
          </div>
        </div>

        <div class="flex" style='flex-direction:column'>
          <div class="signature-header">
            If the foregoing accurately sets forth your and our agreement, then
            please sign this letter in the space provided below.
          </div>

          <div class="flex-center" style='margin-bottom: 7px'>Sincerely,</div>

          <div class='flex-end' style='margin-bottom: 7px'>
            ${htmlObj.perfSignDiv}
          </div>
          <div class='flex-end' >
            <div class='flex' style='align-items:flex-end'>By: ${htmlObj.perfSignature}</div>
          </div>

          <div class="flex-center">
            <div>
              The undersigned: (a) agrees and accepts the above terms and conditions for a producer agreement with ${currentPact.producer.companyName} f/s/o ${currentPact.producer.name} p/k/a “${currentPact.producer.artistName}” (b) assents to the execution of the agreement and agrees to be bound by all of the terms and conditions thereof, and (c) represents and warrants that ${htmlObj.perfCompany} is in a position to offer the services of the undersigned.
            </div>
          </div> 
          <div class="flex-end">
            ${htmlObj.perfNameDiv}
          </div>

          <div style='margin: 5px 0 15px;'>AGREED TO AND ACCEPTED:</div>
          <div class="producer-section">
            <div class="flex" style='flex-direction:column'>
              <div>${currentPact.producer.companyName} f/s/o</div>
              <div>${currentPact.producer.name} p/k/a</div> 
              <div>“${currentPact.producer.artistName}”</div>
            </div>  
            <div class="flex-start">
              <div class='flex' style='align-items:flex-end'>By: ${htmlObj.prodSignature}</div>
            </div>
          </div>
          <div class="flex-center">
            <div>
              The undersigned: (a) agrees and accepts the above terms andconditions for a producer agreement with ${htmlObj.perfInfoSpan}. (b) assents to the execution of the agreement and agrees to be bound by all of the terms and conditions thereof, and (c) represents and warrants that ${currentPact.producer.companyName} is in a position to offer the services of the undersigned.
            </div>
          </div>
          <div class="legal-name">${currentPact.producer.name}</div>
        </div>
      </body>
    </html>
  `
  }

  const acceptPact = async (signature) => {
    try {
      let otherUsers = currentPact.users.filter((user) => {
        return user.user !== currentUser._id
      })
      currentPact.setSignature(signature, currentUser)
      const obj = {
        id: currentPact.pactId,
        signatureImg: signature,
        user: currentUser._id,
        name: currentUser.name,
        status: currentPact.status,
        otherUsers: otherUsers,
        recordTitle: currentPact.recordTitle,
        type: currentPact.type,
      }
      await PactModel.update(obj)
      await generateEmail(signature)
    } catch (error) {
      console.log(error)
    }
  }

  const generateEmail = async (signature) => {
    if (currentUser._id === currentPact.producer.user) {
      htmlObj.prodSignature.length = 0
      let newProd = /*html*/ `
        <img class='signature-img' src="${signature}"/>
      `
      htmlObj.prodSignature.push(newProd)
    } else {
      htmlObj.perfSignature.length = 0
      let newPerf = /*html*/ `
        <img class='signature-img' src="${signature}"/>
      `
      htmlObj.perfSignature.push(newPerf)
    }

    try {
      const { uri } = await Print.printToFileAsync({
        html: generateHTML(htmlObj),
      })
      await MailComposer.composeAsync({
        attachments: [uri],
        recipients: ['evan.doherty.ny@gmail.com'],
      })
      await currentPact.resetPact()
      await navigation.navigate('Dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const confirmSignature = (signature) => {
    currentPact.setSignature(signature, currentUser)
    setSigned(true)
    setVisible(false)
  }

  const [isVisible, setVisible] = useState(false)
  const [isSigned, setSigned] = useState(false)
  const [sig, setSig] = useState('')

  return (
    <Screen>
      <View style={styles.mainView}>
        <View style={styles.btnView}>
          <AppButton
            textColor="white"
            title="More Options"
            style={styles.btnSecondary}
            // onPress={nextScreen}
          />
          {currentPact.signed === false &&
            (isSigned === false ? (
              <AppButton
                textColor="white"
                title="Sign Pact"
                style={styles.btnPrimary}
                onPress={() => setVisible(true)}
              />
            ) : (
              <AppButton
                textColor="white"
                title="Send Pact"
                style={styles.btnPrimary}
                onPress={() => acceptPact(sig)}
              />
            ))}
        </View>
        <WebView
          style={styles.contract}
          originWhitelist={['*']}
          source={{
            html: generateHTML(htmlObj),
          }}
        />
        <SignatureModal
          isVisible={isVisible}
          setVisible={setVisible}
          confirmSignature={confirmSignature}
          name={currentUser.name}
          email={currentUser.email}
          sig={sig}
          setSig={setSig}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 'auto',
    marginVertical: 20,
  },
  btnSecondary: {
    borderRadius: 5,
    height: 45,
    backgroundColor: 'rgba(73, 78, 107, 0.3)',
    width: '40%',
  },
  btnPrimary: {
    marginLeft: 15,
    width: '30%',
    borderRadius: 5,
    height: 45,
    backgroundColor: colors.green,
  },
  contract: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    flex: 1,
  },
})
