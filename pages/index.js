import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import { getConfig, getAdAccounts, getPages, savePage } from '../network';
import FacebookLogin from 'react-facebook-login'

const initial = { email: '' };
const validation = yup.object().shape({
    email: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Email is required'),
});
const modalStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '300px',
        textAlign: 'center'
    }
};

const Check = () => (
    <svg width="65px" height="80px" viewBox="0 0 65 80" style={{ marginRight: '15px' }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(3.000000, 3.000000)" strokeWidth="5">
                <path d="M34.9579128,72.1691793 C17.8072266,78.1904558 10.4811036,68.8482244 4.47886536,51.642539 C-1.52337288,34.4368536 -3.92853472,15.8831055 13.2223607,9.8616192 C30.3730469,3.84034268 49.1420934,12.9070868 55.1443316,30.1127722 C61.1463607,47.3184576 52.1085991,66.1479028 34.9579128,72.1691793 Z" stroke="#61A9FF" />
                <g transform="translate(19.000000, 0.000000)" stroke="#333333" strokeLinecap="round">
                    <path d="M0,31.714054 L14.2008401,54.6560325 C14.2502431,54.7358451 14.354993,54.760497 14.4348056,54.711094 C14.4725728,54.6877166 14.4996877,54.6504831 14.5103461,54.6073639 C20.0408714,32.2331654 28.5374227,14.0307107 40,0" />
                </g>
            </g>
        </g>
    </svg>
);
const Star = () => (
    <svg width="54px" height="56px" viewBox="0 0 54 56" style={{ marginRight: '15px' }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group-10-Copy" transform="translate(2.000000, 2.000000)">
                <path d="M24.3800166,0.439212495 L16.2150004,15.9190646 C15.9763585,16.3714998 15.5357792,16.6825624 15.029566,16.756018 L0.682322718,18.8379177 C0.24507436,18.9013659 -0.0579505144,19.3072607 0.00549771772,19.7445091 C0.0265023984,19.8892611 0.0867902097,20.0254843 0.179805898,20.1383667 L10.7714946,32.9922764 C11.1330639,33.4310713 11.2346084,34.0287866 11.0382341,34.5623693 L5.01887864,50.9179895 C4.86627925,51.3326282 5.07870407,51.7924655 5.49334275,51.9450649 C5.71135321,52.0252992 5.95347365,52.0068063 6.15676987,51.8943929 L24.3848684,41.8151032 C24.8834064,41.5394349 25.4909179,41.5496345 25.9799211,41.8418828 L42.739018,51.8578061 C43.1182763,52.0844665 43.6094705,51.9607613 43.8361308,51.581503 C43.9530551,51.38586 43.9809796,51.1496331 43.9128948,50.9321201 L38.761533,34.4748768 C38.6092271,33.9882995 38.6979406,33.4582661 39.0003875,33.0478024 L49.8463337,18.3282986 C50.1084255,17.9726025 50.0325442,17.4717865 49.6768481,17.2096948 C49.5447339,17.1123475 49.3858783,17.0579848 49.2218216,17.053978 L33.2926792,16.6649393 C32.6514548,16.6492786 32.0815574,16.2521961 31.8447657,15.656089 L25.8311063,0.517107621 C25.6679965,0.106489786 25.2028984,-0.0941551436 24.7922806,0.0689546286 C24.615139,0.139320602 24.4689416,0.270621721 24.3800166,0.439212495 Z" id="Path-24" stroke="#333333" strokeWidth="4" />
                <path d="M29.9953904,27.6172595 C30.0999169,30.2657214 28.4198654,30.8871501 25.6607026,30.9874828 C22.9015715,31.0878461 20.1081809,30.6290731 20.0036544,27.9806112 C19.8990961,25.3321798 22.0510582,23.1038405 24.8102528,23.0035077 C27.5693839,22.9031444 29.8908639,24.9687977 29.9953904,27.6172595 Z" id="Stroke-3-Copy" stroke="#FFE861" strokeWidth="5" />
            </g>
        </g>
    </svg>
);
const BlueUnderline = () => (
    <svg width="229px" height="16px" viewBox="0 0 676 16" style={{ position: 'absolute', left: 0, bottom: '-10px' }}>
        <g stroke="none" fill="none" fillRule="evenodd" strokeLinecap="round">
            <path d="M3,11.8887114 C70.1766859,13.483075 219.630306,-2.70947677 401,5.17809831 C459.365954,7.71637159 550.032621,7.71637159 673,5.17809831" id="Path-21-Copy-7" stroke="#61A9FF" strokeWidth="15" transform="translate(338.000000, 7.500000) scale(1, -1) translate(-338.000000, -7.500000)" />
        </g>
    </svg>
);
const RedUnderline = ({ className }) => (
    <svg width="229px" height="14px" viewBox="0 0 676 14" className={className ? className : ''}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
            <path d="M3,4.77293589 C10.9903672,5.03829912 18.8892131,5.69822302 26.6965375,6.75270759 C47.5620314,9.57087422 108.299673,9.21860339 208.909462,5.6958951 C270.951981,1.77815943 332.978088,2.13043025 394.987784,6.75270759 C456.99748,11.3749849 549.668219,11.0626633 673,5.81574267" stroke="#FF776A" strokeWidth="15" />
        </g>
    </svg>
);
const YellowUnderline = () => (
    <svg width="229px" height="16px" viewBox="0 0 678 16" style={{ bottom: '-19px', position: 'absolute', left: 0 }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
            <path d="M3,7.58386265 C10.6477456,7.89773788 18.2114694,8.60945766 25.6911713,9.71902198 C46.5516065,12.8135296 107.940408,12.4267162 209.857577,8.55858162 C336.747066,1.48769423 431.800185,1.16278791 495.016935,7.58386265 C558.233685,14.0049374 618.22804,14.7166572 675,9.71902198" stroke="#FFE861" strokeWidth="15" />
        </g>
    </svg>
);
const DashedUnderline = () => (
    <svg width="537px" height="2px" viewBox="0 0 537 2" style={{ position: 'absolute', bottom: 0, marginRight: '15px' }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeDasharray="4,9">
            <path d="M0,1 L540,1" stroke="#333333" />
        </g>
    </svg>
);

const FacebookAuthButton = ({ setAdAccount }) => {
    const facebookResponse = async response => {
        try {
            console.warn('Facebook Response', response);

            // Store in localStorage
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('name', response.name);
            localStorage.setItem('userId', response.userID);

            // Use email + token to get ad accounts
            const adAccounts = await getAdAccounts(
                localStorage.getItem('email'),
                response.accessToken
            );

            // Data needs to look like this
            // [
            //     { id: 1, name: 'Kittys Ad Account 1' },
            //     { id: 1, name: 'Kittys Ad Account 2' },
            //     { id: 1, name: 'Kittys Ad Account 3' },
            // ]
            setAdAccount(adAccounts);
        } catch (err) {
            console.warn('Could not fetch ad accounts')
        }
    };

    return (
        <FacebookLogin
            appId="1860355937552252"
            autoLoad={true}
            fields="name,email,picture"
            onClick={() => console.warn('Hello you got clicked')}
            callback={facebookResponse}
            scope="pages_show_list,ads_read"
        />
    )
};

const FacebookForm = ({ toggleModal }) => (
    <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={values => {
            localStorage.setItem('email', values.email);
            toggleModal();
        }}
    >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
            <>
                <input value={values.email} onChange={handleChange('email')} placeholder="Input Electronic Mail Address"/>
                <button onClick={handleSubmit}>Authorize Account Check</button>
                <small>You can revoke access at any time.</small>
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
            </>
        )}
    </Formik>
);

export default () => {
    const [init, setInit] = useState(false);
    const [stage, setStage] = useState(0); // 0: Auth with Facebook, 1: Ad Account, 2: Connect Page
    const [adAccount, setAdAccount] = useState([]);
    const [page, setPage] = useState([]);
    const [selectedAdAccount, selectAdAccount] = useState('');
    const [modal, toggleModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const chooseAdAccount = async adAccountId => {
        try {
            selectAdAccount(adAccountId);
            const pages = await getPages(
                localStorage.getItem('email'),
                localStorage.getItem('token')
            );
            setAdAccount([]);
            setPage(pages);
            // Pages need to look like this
            // [
            //     { id: 1, name: 'Kittys Page 1' },
            //     { id: 1, name: 'Kittys Page 2' },
            //     { id: 1, name: 'Kittys Page 3' },
            // ]
        } catch (err) {
            console.warn('Could not fetch pages')
        }

        // Debugger
        // selectAdAccount(adAccountId);
        // setAdAccount([]);
        // setPage([
        //     { id: 1, name: 'Kittys Page 1' },
        //     { id: 1, name: 'Kittys Page 2' },
        //     { id: 1, name: 'Kittys Page 3' },
        // ]);
    };

    const choosePage = async pageId => {
        try {
            await savePage({
                ...localStorage,
                selectedPage: pageId,
                selectedAdAccount
            });
            setSuccess(true);
        } catch (err) {
            console.warn('Could not send all data to Zapier');
        }

        // Debugger
        // setSuccess(true);
        // console.warn({
        //     ...localStorage,
        //     selectedPage: pageId,
        //     selectedAdAccount
        // })
    };

    useEffect(() => {
        if (!init) {
            localStorage.clear();
            setInit(true);
        }
    });

    return (
        <>
            <style jsx global>{`
            .modal ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .modal ul li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .modal ul li:last-child {
                margin-bottom: 0;
            }

            .modal ul li h5 {
                margin: 0;
                padding: 0;
            }

            .button {
                outline: none;
            }

            .modal ul li button {
                border: none;
                outline: none;
                padding: 5px 15px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                color: white;
                background: #ff776a;
            }

            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 22px 25px;
                background-color: #fff;
                -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
                z-index: 1000;
                position: fixed;
                top: 0;
                width: 100%;
                box-sizing: border-box;
                max-width: 450px;
            }

            header img {
                height: 35px;
                width: 109px;
            }

            section img {
                align-self: center;
            }

            section h1 {
                color: #231f20;
                font-size: 34px;
                line-height: normal;
                margin: 0 0 30px;
            }

            section h2 {
                font-size: 30px;
                font-style: normal;
                font-stretch: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #231f20;
            }

            section p {
                color: #231f20;
                font-size: 16px;
                line-height: 20px;
                margin: 0 0 20px;
            }

            .cta {
                text-align: center;
            }

            .cta input::placeholder {
                text-align: center;
            }

            .cta input {
                text-align: center;
                background: #f9f9f9;
                width: 100%;
                box-sizing: border-box;
                padding: 11px 14px;
                height: 40px;
                font-size: 16px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                border: 1px solid #d0d0d0;
                margin-bottom: 23px;
            }

            .cta input:focus {
                font-weight: bold;
                outline: none;
                box-shadow: none;
                border: 1px solid #61a9ff;
            }

            .cta.dark input {
                background: #fff;
            }

            .cta button {
                background: #ff776a;
                font-size: 16px;
                color: #fff;
                padding: 22px 10px;
                -webkit-border-radius: 34px;
                -moz-border-radius: 34px;
                border-radius: 34px;
                outline: none;
                width: 100%;
                box-sizing: border-box;
                -webkit-box-shadow: 2px 2px 0 0 #e2574a;
                -moz-box-shadow: 2px 2px 0 0 #e2574a;
                box-shadow: 2px 2px 0 0 #e2574a;
                margin-bottom: 18px;
            }

            .cta small {
                font-size: 16px;
                font-weight: normal;
                font-style: oblique;
                font-stretch: normal;
                line-height: 1.25;
                letter-spacing: normal;
                color: #737373;
            }

            section.fold {
                margin-top: 93px;
                background-color: #fff;
                padding: 18px 0 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            section.fold img {
                width: 100%;
                box-sizing: border-box;
                max-width: 274px;
            }

            section.fold svg {
                position: absolute;
                bottom: 0;
            }

            section.qualify,
            section.craft {
                overflow: hidden
            }

            section.freeSession,
            section.qualify,
            section.cta.dark,
            section.sponsors,
            footer {
                background: #f9f9f9;
                padding: 15px 25px;
            }

            section.results,
            section.craft,
            section.cta.light,
            section.getStarted {
                background: #fff;
                padding: 15px 25px;
            }

            section.craft h2 {
                position: relative;
            }

            section ul {
                padding: 0;
                margin: 0;
                list-style: none;
            }

            section ul li {
                font-size: 16px;
                font-weight: 900;
                line-height: 1.25;
                letter-spacing: normal;
                color: #333;
                margin-bottom: 35px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            section ul li:last-child {
                margin-bottom: 0;
            }

            section ul > li > div {
                position: relative;
                display: flex;
                align-items: center;
                height: 50px;
            }

            section.qualify ul li img {
                width: 60px;
                height: 74px;
                margin-right: 23px;
            }

            section.craft ul li img {
                width: 50px;
                height: 52px;
                margin-right: 25px;
            }

            section.getStarted {
                padding-top: 64px;
            }

            section.getStarted h2,
            section.qualify h2 {
                padding-bottom: 10px;
                position: relative;
            }

            section.freeSession {
                position: relative;
            }

            section.freeSession h1 {
                position: relative;
            }

            section.freeSession svg {
                position: absolute;
                top: 0;
                right: 0;
            }

            section.sponsors {
                padding-top: 67px;
                padding-bottom: 38px;
            }

            section.results {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                padding-top: 65px;
            }

            section.results svg {
                position: absolute;
                top: 0;
            }

            section.results img {
                width: 357px;
                height: 271px;
                object-fit: contain;
            }

            footer {
                overflow: hidden;
            }

            footer .images {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            footer .images .circle {
                margin-right: -30px;
            }

            footer a.privacy {
                font-size: 12px;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: normal;
                color: #333333;
                text-decoration: underline;
            }

            footer p {
                color: #333;
                font-size: 12px;
                margin: 19px 0 0;
            }

            .repeat-underline {
                position: absolute;
                bottom: 0;
                left: 0;
                background-image: url(../static/static/imgs/qualify-pattern.png);
                height: 2px;
                width: 100%;
                box-sizing: border-box;
                background-repeat: repeat-x;
            }

            .error {
                color: #ff776a;
            }

            .getstarted-img {
                position: absolute;
                bottom: 0;
                left: -25px;
            }

            .quality-img {
                position: absolute;
                bottom: -8px;
                left: -25px;
            }

            .text-elli {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 10px;
            }
        `}</style>

            <Modal
                isOpen={modal}
                onRequestClose={() => toggleModal(false)}
                style={modalStyles}
                contentLabel="Facebook Authentication"
            >
                <div className="modal">
                    {stage === 0 && (
                        <FacebookAuthButton setAdAccount={adAccounts => {
                            setAdAccount(adAccounts);
                            setStage(1); // Stage 1: Connect your Facebook Page
                        }} />
                    )}
                    {stage === 1 && (
                        <>
                            <h2 style={{ marginTop: 0 }}>Select a Facebook Ad Account</h2>
                            {adAccount.length > 0 ? (
                                <ul>
                                    {adAccount.map(account => (
                                        <li>
                                            <div className="text-elli">{account.name}</div>
                                            <button onClick={async () => {
                                                await chooseAdAccount(account.id);
                                                setStage(2);
                                            }}>Select</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <h5>You have no ad accounts with this Facebook account.</h5>
                            )}
                        </>
                    )}
                    {stage === 2 && (
                        <>
                            <h2 style={{ marginTop: 0 }}>Select a Facebook Page</h2>
                            {page.length > 0 ? (
                                <ul>
                                    {page.map(account => (
                                        <li>
                                            <div className="text-elli">{account.name}</div>
                                            <button onClick={async () => {
                                                await choosePage(account.id);
                                                toggleModal(false);
                                            }}>Select</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <h5>You have no pages with this Facebook account.</h5>
                            )}
                        </>
                    )}
                </div>
            </Modal>

            <header>
                <svg width="147" height="49" viewBox="0 0 147 49">
                    <g fill="none" fillRule="evenodd">
                        <path fill="#231F20" stroke="#231F20" strokeWidth=".5" d="M69.9 9.174c-.382-.39-1.077-.54-1.88.206-2.28 2.115-6.503 5.73-8.772 7.673-.453.388-.839.718-1.13.97l-.155-4.413a2705.8 2705.8 0 0 1-.173-4.972c-.013-.392-.234-.729-.606-.924-.461-.243-1.073-.234-1.489.02a.956.956 0 0 0-.474.878c.125 3.683.279 9.602.428 15.326.435 16.673.533 19.102.665 19.321.316.519 1.057.634 1.594.479.529-.153.847-.54.832-1.012-.104-3.049-.185-6.816-.264-10.458a939.676 939.676 0 0 0-.258-10.324c.19-.162.682-.583 1.965-1.687 1.188 3.574 2.398 7.47 3.57 11.246 1.218 3.927 2.479 7.988 3.715 11.682.147.443.544.694 1.034.694.164 0 .338-.027.517-.086.644-.208 1.174-.784.94-1.482-1.28-3.827-2.528-8.121-3.736-12.274-1.191-4.093-2.422-8.322-3.685-12.114a336.72 336.72 0 0 0 7.348-6.925c.543-.53.444-1.387.014-1.824M78.108 9.03c-.025-.614-.304-1.086-.787-1.329a1.643 1.643 0 0 0-1.588.086c-.342.223-.522.564-.495.934.573 7.665.84 16.197 1.1 24.447.082 2.61.162 5.175.25 7.647.04 1.096.138 1.873.29 2.308.175.494.634.76 1.303.76.067 0 .137-.003.207-.009.342-.025 1.135-.211 1.135-1.389-.004-7.038-.429-14.696-.84-22.102-.22-3.957-.426-7.694-.575-11.353M97.75 4.538c-2.397 0-4.793-.009-7.189-.018-2.396-.008-4.793-.017-7.191-.017-.522 0-.932.213-1.154.598-.26.452-.228 1.095.08 1.602.246.407.624.64 1.035.626 1.319-.03 3.484.001 4.257.014.375 10.716.896 35.13.901 35.372 0 .743.664 1.131 1.32 1.131.356 0 .69-.111.94-.314.298-.24.455-.582.455-.991 0-8.597-.37-17.944-.73-26.984-.11-2.798-.22-5.556-.315-8.237 1.159-.005 5.282-.018 7.537.043.403.01.773-.21 1.017-.607.314-.514.35-1.194.086-1.653-.21-.365-.581-.565-1.048-.565M118.496 3.993l-15.87.01c-.39 0-.73.198-.933.544-.258.439-.262 1.043-.012 1.47.195.331.514.514.899.514l4.95-.003c.09 3.663.101 7.86.113 12.3.02 8.416.042 17.118.593 23.937.056.7.8 1.081 1.541 1.081.055 0 .11-.002.167-.007.746-.058 1.216-.49 1.169-1.076-.592-7.33-.723-17.176-.838-25.863-.05-3.725-.097-7.246-.175-10.373l8.35-.005c.741 0 1.129-.654 1.129-1.299 0-.712-.456-1.23-1.083-1.23M133.061 6.861c-.238.02-.68.146-.965.776l-.259.572c-1.253 2.774-2.258 4.998-3.512 8.026-1.202-1.974-5.16-8.649-5.208-8.729-.32-.515-.994-.648-1.568-.308-.573.34-.946 1.109-.41 1.995.485.804.99 1.682 1.476 2.53.596 1.038 1.212 2.112 1.815 3.087.495.8 1.807 3.258 2.021 3.66.064.973.83 13.005.83 24.2 0 .723.382 1.039.61 1.162.183.1.399.15.622.15.285 0 .582-.08.837-.237.405-.249.624-.63.602-1.046-.297-5.613-.291-8.235-.286-10.77.005-2.55.01-5.186-.283-10.833.263-.75 3.175-8.988 4.972-12.334.205-.384.165-.856-.108-1.263-.284-.423-.75-.67-1.186-.638M141.794 22.38l-.125-.21c-1.17-1.982-2.624-4.448-2.686-7.904-.065-3.581 2.964-6.498 3.783-6.962 1.038-.586 1.171-1.235.969-1.613-.232-.434-.994-.71-2.377-.056-2.91 1.374-5.88 5.026-4.67 10.794.604 2.877 1.694 4.956 2.75 6.966a122.753 122.753 0 0 1 .884 1.709c.965 1.869 2.424 4.692 2.869 6.773.575 2.693-.138 6.826-1.388 8.042-.283.275-.566.376-.866.311-.923-.204-1.84.235-2.231 1.064-.367.777-.15 1.62.554 2.146.48.36 1.016.542 1.572.542.378 0 .766-.085 1.15-.254 2.046-.905 3.603-3.904 3.875-7.462.306-3.985-1.136-8.916-4.063-13.885"/>
                        <path fill="#FF6864" d="M26.57 36.97s-.529-4.196 2.446-3.924c2.974.272 7.275 1.935 7.062 3.297-.214 1.361-4.017 3.63-6.589 2.678-2.572-.954-3.683-.742-2.92-2.05"/>
                        <path fill="#FFE861" d="M33.985 32.972s-2.476-3.346-2.28-7.204c.194-3.857 3.08-2.944 4.049-.457.97 2.486-1.398 5.524-1.86 6.209-.46.685.09 1.452.09 1.452"/>
                        <path fill="#61A9FF" d="M22.514 32.24s-7.864-1.316-10.419-3.052c-2.554-1.735.019-7.002 5.21-5.984 5.19 1.017 10.534 10.18 5.21 9.037"/>
                        <path fill="#231F20" d="M27.586 35.404a9.034 9.034 0 0 0-.047-.788c-.19-1.87-1.568-4.503-4.087-6.677-.535-1.152-2.334-2.261-5.794-3.623-5.495-2.162-11.753 1.659-15.137 6.579a3.35 3.35 0 0 1-.266-1.05c-.446-5.112-.688-12.494.69-18.632 1.085-4.83 1.711-5.767 1.962-5.89.285.003 1.14.732 1.764 1.265l.35.297.02.017c.31.263.645.537 1.004.818 1.786 1.455 5.576 4.536 8.671 6.996 2.43 1.931 6.31 6.098 11.535 12.384.246.297.419.505.505.603.286.333.587.423.83.423.236 0 .416-.084.475-.115.771-.41.6-.98.032-2.864-.489-1.618-1.226-4.065-1.367-5.933-.2-2.66 3.44-12.06 6.485-15.865.916-.716 1.766-1.175 2.299-1.37-.312 1.815-1.63 6.95-2.54 10.498-.43 1.682-.828 3.233-1.114 4.392-.871 3.545-.603 4.303.462 6.384.132.258.28.546.44.873-1.795.172-3.095 2.342-3.558 3.116-.271.453-.409.892-.414 1.311-.25 1.424.802 3.025 2.988 5.682.49.597.695 1.12.606 1.553-.05.246-.197.453-.353.617a6.381 6.381 0 0 0-.549-.277c-1.521-.696-4.106-1.04-5.892-.724M12.04 26.379c.096-.186.528-.414 1.508-.414.584 0 1.364.081 2.382.3a14.03 14.03 0 0 1 5.453 2.457c-.073.005-.148.011-.223.02-.681.068-1.413.31-2.187.566-1.833.604-3.726 1.228-5.298-.143-1.383-1.208-1.838-2.394-1.635-2.786m-1.366 5.377a47.03 47.03 0 0 1-4.36 1.101 3.438 3.438 0 0 1-2.595-.527.937.937 0 0 0 .317-.292c1.518-2.24 3.685-4.24 6.059-5.406.018 1.21.842 2.65 2.315 3.936.25.218.504.396.76.553-.886.199-1.741.407-2.496.635m15.274-18.32l3.867-4.335c-1.738 3.832-3.155 8.056-2.99 10.25.095 1.262.419 2.706.773 4.026-2.213-2.603-5.364-6.19-8.007-8.657 2.15 1.003 4.773.492 6.357-1.284m10.03 13.532c.31.834.548 1.59.717 2.23.012.086.023.17.03.252a.932.932 0 0 0 .12.369c.07.321.118.6.145.833-.71-.429-1.543-.74-2.292-1.02-.686-.256-1.81-.679-1.983-.994a.937.937 0 0 0 .013-.214c.024-.063.057-.137.112-.23.98-1.634 1.756-2.2 2.163-2.2.028 0 .055.003.08.009.304.065.62.443.896.965m12.638 12.708c2.515-.962 3.461-1.834 3.07-2.829-.394-1-1.712-1.012-4.27-.041a120.181 120.181 0 0 1-5.856 2.059c-.818.06-1.644.111-2.441.157 1.28-.716 2.993-1.63 5.288-2.791 2.991-1.513 3.89-2.39 3.435-3.35-.434-.918-1.582-.853-4.238.241-1.962.81-5.089 2.478-7.707 3.933.149-.254.273-.541.343-.868.22-1.016-.113-2.07-.987-3.133A40.33 40.33 0 0 1 33.9 31.34l.121.046c.815.304 1.657.619 2.23 1.034 1.048.759 1.743.45 2.064.199.37-.29.947-1.209.205-4.028-.129-.665-.37-1.526-.76-2.315a37.171 37.171 0 0 0-1.741-3.866c-.896-1.751-1.058-2.067-.311-5.1a490 490 0 0 1 1.11-4.375c1.56-6.084 2.665-10.47 2.665-11.513 0-.622-.336-1.117-.898-1.325-1.618-.598-4.783 1.68-6.448 3.552-1.448 1.63-5.162 5.793-7.621 8.55a3.493 3.493 0 0 1-4.301.734c-3.141-1.716-7.452-4.16-10.152-6.056-.284-.2-.55-.402-.805-.602l-.987-.805-.352-.299C6.593 4.038 5.543 3.143 4.33 3.54c-1.333.434-2.092 2.132-3.246 7.27-1.43 6.368-1.186 13.954-.727 19.197a5.167 5.167 0 0 0 1.302 3.011 5.366 5.366 0 0 0 5.032 1.68 48.822 48.822 0 0 0 4.542-1.148c1.264-.38 2.877-.72 4.438-1.046 2.774-.583 5.172-1.088 6.591-1.9.813.078 1.358.362 1.588.506 1.107 1.4 1.7 2.777 1.793 3.693.088.863.002 1.458-.06 1.892-.076.525-.155 1.069.254 1.545.44.513 1.113.568 2.168.598.333.01.72.025 1.135.042.507.02.97.037 1.397.05.343.263.634.507.84.704l-.115.067a.928.928 0 0 0-.203.165c-.148.063-.316.131-.502.204-.969-.169-5.17-.901-9.37-1.63-2.396-.415-4.792-.829-6.59-1.137-.9-.154-1.65-.28-2.176-.368-.247-.04-.48-.08-.695-.1a1.443 1.443 0 0 1-.044-.01l-.001.006c-.608-.05-1.049.061-1.18.721-.062.314.03.952.822 1.116 2.92.607 6.496 1.35 9.034 1.986-1.073.2-2.307.441-3.728.724-2.09.415-4.064.807-4.834.875a.943.943 0 0 0-.864 1.019.953.953 0 0 0 1.035.85c3.828-.34 6.558-.612 8.502-.868a240.164 240.164 0 0 1-6.066 2.406c-1.227.47-2.08.802-2.626 1.019-.846.337-1.646.654-1.31 1.53.17.443.453.593.81.593.346 0 .76-.143 1.206-.295.508-.174 1.223-.426 2.057-.723 1.66-.59 3.79-1.356 5.684-2.038 1.096-.394 2.111-.76 2.91-1.046a524.73 524.73 0 0 1 4.558-1.606c1.282-.446 2.289-.798 3.087-1.1.006.03.008.06.018.088.004.014.413 1.427-.26 1.772-.113.046-.573.167-2.393.286l-.15.01a.943.943 0 0 0-.884 1.002.947.947 0 0 0 1.018.869l.143-.01c1.801-.118 2.679-.255 3.13-.486.248-.127.452-.28.627-.451.489.337 1.184.661 2.178.88a.95.95 0 0 0 1.139-.71.938.938 0 0 0-.721-1.119c-1.173-.259-1.639-.658-1.806-.854.024-.276.018-.551-.008-.81 2.6.662 7.73 1.948 10.766 2.567.83.17 1.688.249 2.497.249 1.743 0 3.266-.37 3.819-1.019.3-.354.382-.81.215-1.219-.285-.7-1.126-1.067-2.904-1.264-2.41-.267-4.515-.51-6.313-.728.341-.105.69-.214 1.047-.328 2.71-.205 5.28-.506 6.682-1.042"/>
                    </g>
                </svg>

                <img src="static/imgs/marketing-partner.png"
                     srcSet="static/imgs/marketing-partner.png 1x, static/imgs/marketing-partner-2x.png 2x, static/imgs/marketing-partner-3x.png 3x"/>
            </header>

            <section className="fold">
                <img src="static/imgs/fold-demetrius.png" alt="Demetrius"/>
                <svg viewBox="0 0 414 52">
                    <path fill="#F9F9F9" d="M0 0c88.309 26.105 162.424 39.157 222.346 39.157S346.152 26.105 414 0v51.949H0V0z"/>
                </svg>
            </section>

            <section className="freeSession">
                <svg width="132" height="127" viewBox="0 0 132 127">
                    <path fill="none" stroke="#61A9FF" strokeWidth="3" d="M42.35 113.926C6.528 97.977-5.837 74.371 7.672 44.031 21.18 13.691 55.66-10.409 100.7 9.644c45.04 20.054 50.203 61.803 36.694 92.144-13.508 30.34-59.223 28.087-95.045 12.138z"/>
                </svg>
                <h1>Get a Free Session With a Top Facebook Expert</h1>
                <p>Starting with a a $10,000 Facebook credit in 2013, Demetrius built a multi-million dollar budget at
                    Shopify through results. Along the way he tried many agencies for support, but found that few truly
                    understood Facebook.</p>
                <p>So, he founded Kittys – an agency that creates strategies that embrace what makes social marketing
                    unique. With billions of impressions to his name, you won’t find many Facebook marketers with a greater
                    depth of experience and insight.</p>
            </section>

            <section className="qualify">
                <h2>How to Qualify<RedUnderline className="quality-img"/></h2>
                <p>Kittys works with companies of all sizes and complexities, but we do have some requirements for this free
                    consultation. Your company must have:</p>
                <ul>
                    <li>
                        <Check />
                        <div style={{ paddingBottom: '10px' }}>
                            Spent over 1 Million Dollars on Facebook in 2018<DashedUnderline /></div>
                    </li>
                    <li>
                        <Check />
                        <div style={{ paddingBottom: '10px' }}>Advertised on Facebook for at least 6 months
                            <DashedUnderline />
                        </div>
                    </li>
                </ul>
                <p style={{ marginTop: '52px' }}>To get started, connect with our automatic account analysis tool and we will contact you if you qualify.</p>
            </section>

            <section className="cta dark">
                {success
                    ? <h3>We will get in touch with you soon!</h3>
                    : <FacebookForm toggleModal={() => toggleModal(true)} />
                }
            </section>

            <section className="sponsors">
                <svg viewBox="0 0 339 118">
                    <defs>
                        <path id="a" d="M.089.635h28.273v28.929H.09z"/>
                        <path id="c" d="M0 130.317h338.581v-130H0z"/>
                    </defs>
                    <g fill="none" fillRule="evenodd" transform="translate(0 -1)">
                        <path fill="#333" d="M210.65 76.767c.225 0 .45.076.666.227-1.662.79-3.444 2.782-4.197 6.759l-3.169.992c.882-3.033 2.975-7.978 6.7-7.978m1.543 1.474c.318.809.526 1.968.526 3.532l-.001.229-4.01 1.254c.773-3.012 2.219-4.466 3.485-5.015m3.826 2.727l-1.94.608v-.424c0-1.296-.178-2.34-.464-3.168 1.149.146 1.912 1.465 2.404 2.984m9.318 2.309a.39.39 0 0 0-.351-.33c-.147-.013-3.239-.244-3.239-.244s-2.147-2.155-2.382-2.393c-.237-.239-.697-.167-.876-.113l-1.201.375c-.718-2.086-1.984-4.003-4.21-4.003-.062 0-.125.002-.19.006-.632-.847-1.417-1.215-2.095-1.215-5.187 0-7.666 6.555-8.443 9.886l-3.631 1.138c-1.126.357-1.16.393-1.308 1.465-.112.811-3.057 23.823-3.057 23.823l22.943 4.345 12.431-2.718s-4.364-29.819-4.391-30.022"/>
                        <path fill="#262626" d="M224.985 82.947c-.146-.013-3.238-.244-3.238-.244l-2.383-2.393a.589.589 0 0 0-.331-.155l-1.735 35.862 12.43-2.718s-4.364-29.818-4.392-30.023a.39.39 0 0 0-.35-.33"/>
                        <path fill="#FFF" d="M213.077 89.889l-1.532 4.608s-1.344-.725-2.99-.725c-2.413 0-2.535 1.531-2.535 1.917 0 2.104 5.429 2.91 5.429 7.84 0 3.879-2.434 6.377-5.716 6.377-3.939 0-5.952-2.478-5.952-2.478l1.054-3.521s2.07 1.796 3.818 1.796c1.14 0 1.605-.908 1.605-1.571 0-2.746-4.453-2.869-4.453-7.38 0-3.796 2.695-7.471 8.139-7.471 2.097 0 3.133.608 3.133.608"/>
                        <path fill="#333" d="M244.219 98.527c-1.24-.68-1.877-1.253-1.877-2.04 0-1.003.885-1.647 2.266-1.647 1.61 0 3.047.68 3.047.68l1.133-3.508s-1.043-.823-4.108-.823c-4.269 0-7.227 2.47-7.227 5.942 0 1.97 1.382 3.473 3.223 4.546 1.488.86 2.02 1.468 2.02 2.364 0 .93-.744 1.682-2.125 1.682-2.059 0-4.004-1.075-4.004-1.075l-1.203 3.51s1.795 1.216 4.817 1.216c4.392 0 7.544-2.183 7.544-6.121 0-2.113-1.593-3.616-3.506-4.726M261.717 91.153c-2.16 0-3.86 1.038-5.172 2.613l-.07-.036 1.877-9.916h-4.888l-4.747 25.238h4.888l1.63-8.628c.638-3.257 2.302-5.261 3.86-5.261 1.098 0 1.524.75 1.524 1.825 0 .68-.07 1.503-.213 2.183l-1.842 9.881h4.889l1.912-10.202c.213-1.075.354-2.363.354-3.223 0-2.791-1.452-4.474-4.002-4.474M274.362 105.616c-1.664 0-2.373-1.433-2.373-3.222 0-2.829 1.453-7.446 4.109-7.446 1.735 0 2.302 1.503 2.302 2.97 0 3.043-1.452 7.698-4.038 7.698m2.41-14.463c-5.88 0-9.777 5.37-9.777 11.348 0 3.83 2.338 6.909 6.73 6.909 5.774 0 9.67-5.227 9.67-11.348 0-3.544-2.054-6.91-6.624-6.91M291.223 105.687c-1.269 0-2.018-.716-2.018-.716l.814-4.618c.567-3.079 2.16-5.12 3.86-5.12 1.488 0 1.949 1.397 1.949 2.72 0 3.187-1.877 7.734-4.605 7.734m4.675-14.535c-3.298 0-5.17 2.936-5.17 2.936h-.072l.284-2.649h-4.321c-.213 1.79-.603 4.51-.992 6.55l-3.401 18.08h4.888l1.346-7.302h.107s1.004.643 2.868.643c5.74 0 9.493-5.942 9.493-11.957 0-3.33-1.452-6.3-5.03-6.3M307.907 84.064c-1.559 0-2.798 1.254-2.798 2.864 0 1.468.92 2.47 2.302 2.47h.071c1.523 0 2.834-1.038 2.87-2.863 0-1.433-.957-2.47-2.445-2.47M301.07 109.052h4.889l3.33-17.506h-4.923zM114.01 4.904c-1.13 1.227-1.696 2.86-1.696 4.899v12.852c0 2.163.523 3.782 1.567 4.861 1.044 1.081 2.71 1.62 4.994 1.62 2.04 0 3.619-.543 4.736-1.635 1.118-1.096 1.677-2.698 1.677-4.809v-8.065h-6.193v4.382h1.459v3.94c0 .42-.154.758-.463 1.014-.31.257-.754.387-1.228.387-.616 0-1.177-.161-1.344-.48a2.14 2.14 0 0 1-.248-.992V9.803c0-.172.024-.375.071-.61.047-.233.13-.447.25-.643.118-.197.28-.363.48-.498.202-.134.47-.2.803-.2.5 0 .895.25 1.193.753.298.502.459 1.135.484 1.897l4.81-.847c.072-.934-.006-1.804-.239-2.616a5.072 5.072 0 0 0-1.166-2.098c-.545-.59-1.239-1.051-2.077-1.383-.838-.33-1.828-.497-2.97-.497-2.137 0-3.771.614-4.9 1.843zm25.017 24.014v-4.79h-6.67V18.31h5.83v-4.79h-5.83V8.07h6.67V3.284H127.4v25.634h11.627zm10.748-12.333l-4.7-13.301h-4.338v25.634h4.957V15.392h.18l4.72 13.526h4.209V3.284h-4.846v13.301h-.182zm19.314 12.333v-4.79h-6.67V18.31h5.831v-4.79h-5.83V8.07h6.67V3.284h-11.625v25.634h11.624zm1.82-25.634v25.634h4.957v-9.983h.982l2.99 9.983h5.064l-3.642-11.124c.946-.663 1.651-1.547 2.112-2.654.463-1.104.694-2.527.694-4.271 0-1.4-.178-2.582-.53-3.554-.351-.969-.844-1.756-1.473-2.356A5.458 5.458 0 0 0 179.8 3.67c-.875-.256-1.835-.386-2.88-.386h-6.011zm5.87 4.786c.75 0 1.364.228 1.839.681.473.456.71 1.175.71 2.156 0 .661-.072 1.196-.218 1.601-.147.406-.346.732-.604.977-.253.246-.54.41-.853.497a3.87 3.87 0 0 1-1.022.129h-.765V8.07h.912zm18.437 20.848h5.21L195.58 3.284h-6.048l-4.81 25.634h5.247l.766-5.011h3.715l.766 5.01zM192.484 9.91h.217l.548 5.195.473 4.086h-2.294l.508-4.086.548-5.195zm20.843 19.007v-4.79h-6.67V3.284h-4.954v25.634h11.624zm17.125 0h5.213l-4.848-25.634h-6.049l-4.81 25.634h5.248l.764-5.011h3.719l.763 5.01zM227.721 9.91h.217l.547 5.195.474 4.086h-2.294l.508-4.086.548-5.195zm21.663 8.823a5.776 5.776 0 0 0-.687-2.081c-.353-.614-.866-1.18-1.544-1.694-.677-.517-1.597-1.008-2.755-1.474-.678-.27-1.206-.523-1.58-.757-.375-.231-.658-.472-.853-.717a1.76 1.76 0 0 1-.362-.773 5.293 5.293 0 0 1-.074-.919c0-.27.02-.554.056-.85.036-.292.108-.558.217-.792.108-.231.256-.428.45-.588.19-.16.454-.238.792-.238.359 0 .64.072.846.219.204.15.368.35.487.607.118.26.197.547.233.866.037.32.055.665.055 1.032l4.884-1.07c0-.71-.1-1.446-.293-2.207a5.807 5.807 0 0 0-1.002-2.082c-.474-.624-1.124-1.14-1.949-1.546-.826-.405-1.87-.609-3.133-.609-1.191 0-2.205.185-3.044.553-.838.366-1.519.869-2.04 1.507-.523.636-.906 1.403-1.149 2.296a11.165 11.165 0 0 0-.364 2.925c0 .833.06 1.596.181 2.299.122.696.382 1.359.784 1.984.403.624.978 1.213 1.732 1.765.753.551 1.75 1.085 2.988 1.598.461.197.85.386 1.167.57.312.185.562.4.746.645.183.244.31.537.382.882.074.343.11.771.11 1.285 0 .368-.018.737-.055 1.104-.036.369-.107.688-.215.957-.11.27-.266.49-.47.661-.203.173-.487.258-.844.258-.626 0-1.055-.235-1.281-.7-.229-.467-.368-1.166-.415-2.1l-4.992.957c0 .91.12 1.766.363 2.567a5.67 5.67 0 0 0 1.15 2.114c.52.608 1.2 1.084 2.04 1.43.837.345 1.84.519 3.005.519 1.288 0 2.356-.183 3.208-.55.85-.372 1.526-.89 2.022-1.566.497-.675.85-1.494 1.058-2.451.205-.957.31-2.026.31-3.204 0-.982-.055-1.86-.165-2.632zm14.647 0a5.75 5.75 0 0 0-.687-2.081c-.35-.614-.865-1.18-1.541-1.694-.678-.517-1.597-1.008-2.757-1.474-.68-.27-1.203-.523-1.58-.757-.374-.231-.657-.472-.85-.717a1.749 1.749 0 0 1-.365-.773 5.244 5.244 0 0 1-.071-.919c0-.27.018-.554.054-.85.035-.292.106-.558.216-.792a1.66 1.66 0 0 1 .451-.588c.19-.16.456-.238.792-.238.358 0 .642.072.846.219.204.15.366.35.486.607.119.26.198.547.236.866.033.32.052.665.052 1.032l4.884-1.07c0-.71-.097-1.446-.292-2.207a5.767 5.767 0 0 0-1.003-2.082c-.471-.624-1.124-1.14-1.95-1.546-.823-.405-1.87-.609-3.132-.609-1.192 0-2.206.185-3.045.553-.835.366-1.519.869-2.04 1.507-.522.636-.905 1.403-1.147 2.296a11.165 11.165 0 0 0-.365 2.925c0 .833.062 1.596.183 2.299.12.696.383 1.359.783 1.984.401.624.979 1.213 1.732 1.765.751.551 1.747 1.085 2.987 1.598.46.197.85.386 1.166.57.316.185.565.4.746.645.184.244.312.537.385.882.072.343.108.771.108 1.285 0 .368-.019.737-.052 1.104-.038.369-.109.688-.218.957a1.65 1.65 0 0 1-.467.661c-.207.173-.489.258-.849.258-.625 0-1.05-.235-1.28-.7-.226-.467-.366-1.166-.414-2.1l-4.991.957c0 .91.122 1.766.364 2.567.244.806.626 1.51 1.147 2.114.523.608 1.203 1.084 2.042 1.43.838.345 1.838.519 3.005.519 1.286 0 2.357-.183 3.206-.55.853-.372 1.526-.89 2.025-1.566.498-.675.848-1.494 1.056-2.451.206-.957.31-2.026.31-3.204 0-.982-.056-1.86-.166-2.632zm13.83 10.184v-4.79h-6.67V18.31h5.832v-4.79h-5.832V8.07h6.67V3.284h-11.624v25.634h11.625zm11.961-5.011l2.323-9.331h.293v14.342h4.954V3.284h-4.627l-2.478 6.738-1.751 5.195h-.218l-1.71-5.084-2.518-6.85h-4.625v25.635h4.956v-14.45h.33l2.358 9.439h2.713zm15.734-10.756h-.849V7.684h.737c.802 0 1.386.166 1.751.498.365.33.546 1.063.546 2.393 0 1.72-.73 2.576-2.185 2.576zm2.332 9.078a3.38 3.38 0 0 1-.31 1.109c-.16.321-.376.574-.658.762-.276.182-.648.274-1.11.274h-1.103v-6.58h1.14c.705 0 1.232.21 1.585.629.353.422.527 1.148.527 2.186 0 .494-.023 1.199-.071 1.62zm1.822-6.903a3.383 3.383 0 0 0 1.258-.773c.35-.346.635-.737.856-1.179.218-.442.38-.914.49-1.417a7.076 7.076 0 0 0 .166-1.53c0-2.357-.567-4.136-1.696-5.34-1.128-1.201-2.825-1.803-5.085-1.803h-5.719v25.634h5.612c2.354 0 4.128-.646 5.32-1.934 1.19-1.29 1.786-3.31 1.786-6.06 0-.589-.049-1.165-.146-1.732a5.948 5.948 0 0 0-.491-1.562 4.54 4.54 0 0 0-.913-1.272c-.375-.37-.856-.651-1.438-.848v-.184zm16.372 13.592v-4.79h-6.266V3.284h-4.953v25.634h11.219zm5.084-16.28l-2.135-9.354h-5.28l4.956 15.21v10.424h4.955V18.493l4.92-15.21h-5.245l-1.992 9.355h-.179z"/>
                        <g transform="translate(76.831 1)">
                            <mask id="b" fill="#fff">
                                <use xlinkHref="#a" />
                            </mask>
                            <path fill="#333" d="M18.593 23.487l-.515-4.077h-1.36l-.514 4.077h-2.388l2.19-16.777h2.753l2.205 16.777h-2.371zm-5.318-11.24h-2.257V9.714c0-.08-.01-.172-.03-.28a.966.966 0 0 0-.115-.298.755.755 0 0 0-.219-.228.643.643 0 0 0-.366-.093c-.012 0-.02.002-.033.003v-.003a.64.64 0 0 0-.365.093.737.737 0 0 0-.218.228.9.9 0 0 0-.113.299c-.023.107-.034.2-.034.279v10.991c0 .16.039.312.113.459.075.147.255.22.536.22.215 0 .393-.06.533-.178a.577.577 0 0 0 .21-.465v-3.176h-.762v-2.018h3.02v5.073c0 .975-.255 1.712-.764 2.215-.508.503-1.226.756-2.156.756-1.04 0-1.795-.25-2.272-.748-.476-.498-.713-1.244-.713-2.239V9.713c0-.94.256-1.69.771-2.256.514-.567 1.257-.848 2.232-.848.972 0 1.715.281 2.23.848.515.565.772 1.317.772 2.256v2.535zM27.351 15.1c0-.572.451-1.035 1.011-1.037a15.015 15.015 0 0 0-.216-1.707h-.003a1.01 1.01 0 0 1-1.24-.732 1.04 1.04 0 0 1 .716-1.269h.003c-.184-.545-.4-1.077-.645-1.592l-.002.002a1 1 0 0 1-1.383-.378 1.05 1.05 0 0 1 .371-1.417 14.444 14.444 0 0 0-1.025-1.364.998.998 0 0 1-1.431 0 1.052 1.052 0 0 1 0-1.466c-.426-.376-.87-.726-1.336-1.049v.001a.999.999 0 0 1-1.382.379 1.048 1.048 0 0 1-.373-1.414l.002-.003a13.782 13.782 0 0 0-1.555-.66v.003a1.01 1.01 0 0 1-1.24.733c-.54-.147-.86-.716-.718-1.27l.002-.002a14.175 14.175 0 0 0-1.67-.224c0 .574-.453 1.038-1.01 1.038-.562 0-1.013-.464-1.013-1.038-.568.042-1.124.118-1.67.224V.86a1.037 1.037 0 0 1-.716 1.269 1.009 1.009 0 0 1-1.24-.733v-.004c-.534.191-1.055.41-1.557.661h.002a1.05 1.05 0 0 1-.37 1.417 1 1 0 0 1-1.383-.379h-.001A14.4 14.4 0 0 0 4.944 4.14c.396.404.395 1.06.001 1.464a.998.998 0 0 1-1.432.002v-.002c-.368.435-.711.89-1.026 1.366.485.288.65.92.372 1.415a1 1 0 0 1-1.383.38l-.002-.002c-.246.515-.46 1.047-.646 1.592H.83c.54.149.86.716.716 1.269-.145.553-.7.882-1.24.732H.307c-.104.56-.178 1.129-.217 1.707.558 0 1.01.465 1.01 1.037a1.022 1.022 0 0 1-1.01 1.036c.04.579.113 1.149.217 1.707h.002c.539-.148 1.094.18 1.239.73a1.038 1.038 0 0 1-.716 1.27H.828c.184.546.4 1.078.646 1.592a1.002 1.002 0 0 1 1.385.379 1.049 1.049 0 0 1-.371 1.414c.314.477.657.932 1.025 1.367a.995.995 0 0 1 1.43 0 1.05 1.05 0 0 1 0 1.463c.425.377.87.729 1.336 1.05v-.001c.28-.495.899-.664 1.383-.38.484.289.65.92.371 1.417l-.002.003c.502.25 1.023.47 1.556.659l.002-.004a1.01 1.01 0 0 1 1.24-.731c.538.147.859.714.715 1.267v.001c.546.11 1.102.184 1.67.225 0-.573.451-1.037 1.011-1.037.559 0 1.012.464 1.012 1.035v.002c.566-.04 1.123-.116 1.668-.225a1.04 1.04 0 0 1 .717-1.268c.54-.149 1.094.18 1.24.731l.001.004c.534-.19 1.053-.41 1.555-.659l-.002-.003a1.05 1.05 0 0 1 .372-1.415 1 1 0 0 1 1.383.378v.001c.465-.321.91-.673 1.336-1.048v-.002a1.049 1.049 0 0 1 0-1.463.996.996 0 0 1 1.431 0c.367-.433.71-.888 1.025-1.366v-.001a1.046 1.046 0 0 1-.371-1.414 1 1 0 0 1 1.383-.38l.002.003c.245-.516.461-1.046.645-1.593h-.003a1.037 1.037 0 0 1-.716-1.268c.144-.553.7-.88 1.24-.733h.003c.104-.558.177-1.128.216-1.707-.56 0-1.012-.465-1.011-1.036z" mask="url(#b)"/>
                        </g>
                        <path fill="#333" d="M94.226 16.406c-.547 0-.99.453-.99 1.013 0 .56.443 1.014.99 1.014.547 0 .992-.454.992-1.014s-.445-1.013-.992-1.013M32.183 10.64h-1.165v4.306h1.165c1.553 0 2.79-.52 2.79-2.178 0-1.608-1.237-2.129-2.79-2.129"/>
                        <path fill="#333" d="M32.725 18.618h-1.707v5.13h-7.831l-.777-2.453a8.804 8.804 0 0 1-2.756.427 8.805 8.805 0 0 1-2.821-.45l-.807 2.477h-4.8l.529-1.433c-.064.057-.128.115-.193.169-1.199.972-2.695 1.509-4.55 1.542l-.276.002c-2.13 0-4.218-.594-5.983-1.608l1.632-3.278c1.768 1.056 2.879 1.293 4.378 1.263.776-.015 1.337-.159 1.704-.542.221-.234.339-.522.346-.833.015-.851-1.184-1.25-2.651-1.708-1.19-.375-2.54-.882-3.593-1.664C1.318 14.73.724 13.57.753 11.93a4.536 4.536 0 0 1 1.265-3.117C3.179 7.6 5.055 6.86 7.304 6.86h.014c1.928.004 4.282.556 5.989 1.433l-1.842 3.233c-1.864-.91-2.803-.996-3.865-1.054-1.582-.087-2.384.487-2.393 1.102-.014.752 1.494 1.433 2.92 1.894 2.158.693 4.9 1.62 5.318 4.298l3.943-10.622h4.579l4.619 12.702V7.144h5.285c5.053 0 7.427 1.82 7.427 5.787 0 3.563-2.444 5.687-6.573 5.687zM0 2.098v26.85h27.141l26.565-26.85H0zM34.674 27.085v-.62h.412c.206 0 .428.044.428.294 0 .31-.227.326-.479.326h-.36zm0 .259h.347l.523.869h.339l-.567-.884c.29-.034.515-.192.515-.551 0-.396-.231-.571-.7-.571h-.757v2.006h.3v-.87zm.366 1.608c.937 0 1.74-.74 1.74-1.745 0-1-.803-1.737-1.74-1.737-.949 0-1.75.737-1.75 1.737 0 1.006.801 1.745 1.75 1.745zm-1.403-1.745c0-.825.615-1.449 1.403-1.449.777 0 1.393.624 1.393 1.449 0 .838-.616 1.454-1.393 1.454-.788 0-1.403-.616-1.403-1.454zM42.597 86.425v8.5h8.12v-8.5h4.916v22.038h-4.917v-9.19h-8.119v9.19h-4.916V86.425zM65.604 108.82c-4.626 0-8.185-3.072-8.185-8.237s3.365-8.467 8.475-8.467c4.82 0 8.055 3.366 8.055 8.206 0 5.817-4.107 8.499-8.314 8.499h-.031zm.095-3.561c1.943 0 3.14-1.93 3.14-4.807 0-2.355-.908-4.774-3.14-4.774-2.328 0-3.233 2.419-3.233 4.807 0 2.713 1.132 4.774 3.201 4.774h.032zM83.782 108.82c-4.627 0-8.184-3.072-8.184-8.237s3.365-8.467 8.476-8.467c4.82 0 8.055 3.366 8.055 8.206 0 5.817-4.11 8.499-8.315 8.499h-.032zm.097-3.561c1.941 0 3.139-1.93 3.139-4.807 0-2.355-.909-4.774-3.14-4.774-2.33 0-3.233 2.419-3.233 4.807 0 2.713 1.13 4.774 3.203 4.774h.03zM93.925 96.136v6.571c0 2.256.454 3.793 1.36 4.74.808.82 2.134 1.374 3.719 1.374 1.36 0 2.554-.196 3.17-.425l-.033-3.76c-.452.098-.775.132-1.455.132-1.454 0-1.94-.885-1.94-2.813v-5.819h3.527v-3.662h-3.528v-3.092l-.018.01V87.63c-2.65 0-4.798 2.165-4.798 4.845h-.004v3.662zM144.288 96.136v6.571c0 2.256.454 3.793 1.359 4.74.809.82 2.134 1.374 3.719 1.374 1.358 0 2.555-.196 3.17-.425l-.033-3.76c-.45.098-.776.132-1.456.132-1.454 0-1.94-.885-1.94-2.813v-5.819h3.527v-3.662h-3.526v-3.092l-.019.01V87.63c-2.649 0-4.797 2.165-4.797 4.845h-.004v3.662zM104.86 104.145c.906.555 2.78 1.178 4.238 1.178 1.487 0 2.102-.491 2.102-1.307 0-.852-.485-1.244-2.297-1.866-3.3-1.076-4.563-2.91-4.53-4.772 0-3.008 2.523-5.264 6.44-5.264 1.843 0 3.46.458 4.43.949l-.84 3.4c-.713-.36-2.104-.883-3.43-.883-1.196 0-1.875.49-1.875 1.274 0 .785.614 1.178 2.555 1.866 3.007 1.011 4.237 2.58 4.27 4.902 0 3.008-2.296 5.198-6.825 5.198-2.07 0-3.915-.49-5.112-1.144l.874-3.53zM132.684 103.329c0 2.092.067 3.791.13 5.133h-4.27l-.226-2.256h-.097c-.615.98-2.102 2.614-4.949 2.614-3.236 0-5.565-2.025-5.565-6.964v-9.383h4.917v8.6c0 2.321.746 3.724 2.492 3.724 1.356 0 2.165-.946 2.456-1.732.13-.293.194-.652.194-1.078v-9.514h4.918v10.856z"/>
                        <mask id="d" fill="#fff">
                            <use xlinkHref="#c" />
                        </mask>
                        <path fill="#333" d="M136.048 108.464h4.919V92.476h-4.919zM138.475 90.381c-1.649 0-2.716-1.177-2.716-2.648 0-1.505 1.1-2.648 2.78-2.648 1.682 0 2.718 1.143 2.75 2.648 0 1.47-1.068 2.648-2.782 2.648h-.032zM158.83 102.02c.16 2.093 2.166 3.073 4.463 3.073 1.683 0 3.042-.227 4.368-.685l.648 3.367c-1.62.687-3.594 1.013-5.729 1.013-5.368 0-8.441-3.138-8.441-8.173 0-4.055 2.522-8.535 7.99-8.535 5.11 0 7.05 4.024 7.05 7.98 0 .847-.096 1.601-.16 1.993l-10.19-.033zm5.79-3.4c0-1.176-.517-3.237-2.75-3.237-2.102 0-2.943 1.929-3.074 3.236h5.823zM173.8 95.15h.417c.206 0 .37-.054.496-.161a.522.522 0 0 0 .186-.412c0-.195-.055-.335-.165-.42-.111-.084-.286-.127-.525-.127h-.409v1.12zm1.674-.588a.954.954 0 0 1-.164.55.975.975 0 0 1-.46.358l.917 1.54h-.648l-.799-1.38h-.52v1.38h-.571v-3.474h1.006c.428 0 .741.084.94.253.2.17.3.427.3.773zm-3.672.71c0 .45.112.87.335 1.26.224.392.53.7.917.925.386.224.8.337 1.243.337.448 0 .864-.113 1.247-.34a2.528 2.528 0 0 0 .914-3.443 2.532 2.532 0 0 0-.908-.921 2.403 2.403 0 0 0-1.253-.341c-.446 0-.862.113-1.245.339a2.523 2.523 0 0 0-1.25 2.184zm-.405 0c0-.52.128-1.009.386-1.464.257-.454.61-.812 1.06-1.076a2.84 2.84 0 0 1 1.454-.393c.515 0 .998.13 1.447.39.45.26.805.618 1.065 1.073.26.455.39.944.39 1.47a2.93 2.93 0 0 1-1.424 2.522c-.45.27-.942.406-1.478.406a2.823 2.823 0 0 1-1.473-.404 2.927 2.927 0 0 1-1.427-2.524zM321.721 91.51h-3.4l.176-.822c.284-1.684 1.276-3.187 2.905-3.187.87 0 1.558.25 1.558.25l.957-3.865s-.85-.43-2.657-.43c-1.735 0-3.47.501-4.781 1.647-1.665 1.432-2.444 3.508-2.834 5.585l-.142.822h-2.267l-.708 3.724h2.267l-2.586 13.818h4.888l2.586-13.818h3.365l.673-3.724zM333.481 91.546s-3.056 7.782-4.428 12.029h-.07c-.094-1.368-1.205-12.029-1.205-12.029h-5.136l2.94 16.074c.071.358.035.573-.106.824-.567 1.11-1.523 2.184-2.657 2.971-.921.68-1.948 1.11-2.763 1.396l1.346 4.189c.992-.215 3.047-1.038 4.782-2.685 2.232-2.113 4.286-5.37 6.411-9.81l5.986-12.959h-5.1zM19.637 12.373l-1.677 5.341a4.738 4.738 0 0 0 1.694.303c.602 0 1.166-.106 1.659-.287l-1.641-5.357h-.035zM20.322 81.63a12.564 12.564 0 0 0-6.336-1.733 12.55 12.55 0 0 0-6.409 1.734 12.491 12.491 0 0 0-6.334-1.699v12.844c-.04 14.193 11.381 25.648 25.412 25.688V79.932a12.486 12.486 0 0 0-6.333 1.699" mask="url(#d)"/>
                        <path fill="#FFF" d="M19.396 93.755c-2.007-.005-3.629-1.654-3.624-3.682.002-.377.06-.742.166-1.085.282.64.914 1.088 1.652 1.09a1.825 1.825 0 0 0 1.82-1.83 1.833 1.833 0 0 0-1.07-1.675c.34-.105.702-.161 1.076-.16 2.006.006 3.63 1.653 3.623 3.682-.007 2.028-1.638 3.667-3.643 3.66m-10.9-.03c-2.005-.006-3.629-1.655-3.622-3.682.005-2.03 1.639-3.669 3.644-3.662.374 0 .733.059 1.074.166a1.831 1.831 0 0 0-1.078 1.67 1.826 1.826 0 0 0 1.81 1.841 1.817 1.817 0 0 0 1.658-1.082c.103.344.16.709.158 1.087-.006 2.028-1.637 3.668-3.644 3.661m10.925-9.148c-2.845-.008-5.184 2.191-5.438 5.003l-.025-.035-.024.035c-.238-2.813-2.565-5.027-5.411-5.034-3.01-.01-5.456 2.45-5.463 5.491-.01 3.043 2.422 5.516 5.432 5.524a5.366 5.366 0 0 0 2.91-.847l2.534 2.576 2.549-2.56a5.38 5.38 0 0 0 2.905.863c3.01.009 5.457-2.45 5.466-5.492.007-3.042-2.424-5.516-5.435-5.524" mask="url(#d)"/>
                    </g>
                </svg>
            </section>

            <section className="results">
                <svg viewBox="0 0 414 53">
                    <path fill="#F9F9F9" fillRule="evenodd" d="M0 0h414v33c-113.625-4.806-199.483-5.806-257.573-3C98.337 32.806 46.195 40.473 0 53V0z"/>
                </svg>

                <img src="static/imgs/illustration.png" srcSet="static/imgs/illustration.png 1x, static/imgs/illustration-2x.png 2x, static/imgs/illustration-3x.png 3x"/>
            </section>

            <section className="craft">
                <h2>Crafted Results<YellowUnderline /></h2>
                <p>Does it feel like your agency isn’t invested in you? Kittys strives to be an extension of your team. We
                    understand your funnel, we reflect your values in our creative, and we care about your results. Everyone
                    wins when you grow.</p>
                <ul>
                    <li>
                        <Star />
                        <div>Over 1 billion impressions in 2018
                            <DashedUnderline />
                        </div>
                    </li>
                    <li>
                        <Star />
                        <div>Advertised on Facebook for at least 6 months<DashedUnderline /></div>
                    </li>
                </ul>
                <img style={{ marginTop: '53px' }} src="static/imgs/marketing-partner.png" srcSet="static/imgs/marketing-partner.png 1x, static/imgs/marketing-partner-2x.png 2x, static/imgs/marketing-partner-3x.png 3x"/>
            </section>

            <section className="getStarted dark">
                <h2>Get Started<BlueUnderline /></h2>
                <p>To verify you meet the qualifications for a free consultation, connect your account to our analysis tool. We’ll be in touch if you qualify!</p>
            </section>

            <section className="cta light" style={{ paddingBottom: '115px' }}>
                {success
                    ? <h3>We will get in touch with you soon!</h3>
                    : <FacebookForm toggleModal={() => toggleModal(true)} />
                }
            </section>

            <footer>
                <div className="images">
                    <svg width="93" height="42" viewBox="0 0 93 42">
                        <g fill="#231F20" fillRule="evenodd" stroke="#231F20" strokeWidth=".5">
                            <path d="M15.9 6.174c-.382-.39-1.077-.54-1.88.206-2.28 2.115-6.503 5.73-8.772 7.673-.453.388-.839.718-1.13.97l-.155-4.413c-.058-1.633-.115-3.266-.173-4.972-.013-.392-.234-.729-.606-.924-.461-.243-1.073-.234-1.489.02a.956.956 0 0 0-.474.878c.125 3.683.279 9.602.428 15.326.435 16.673.533 19.102.665 19.321.316.519 1.057.634 1.594.479.529-.153.847-.54.832-1.012-.104-3.049-.185-6.816-.264-10.458a939.675 939.675 0 0 0-.258-10.324c.19-.162.682-.583 1.965-1.687 1.188 3.574 2.398 7.47 3.57 11.246 1.218 3.927 2.479 7.988 3.715 11.682.147.443.544.694 1.034.694.164 0 .338-.027.517-.086.644-.208 1.174-.784.94-1.482-1.28-3.827-2.528-8.121-3.736-12.274-1.191-4.093-2.422-8.322-3.685-12.114a336.72 336.72 0 0 0 7.348-6.925c.543-.53.444-1.387.014-1.824M24.108 6.03c-.025-.614-.304-1.086-.787-1.329a1.643 1.643 0 0 0-1.588.086c-.342.223-.522.564-.495.934.573 7.665.84 16.197 1.1 24.447.082 2.61.162 5.175.25 7.647.04 1.096.138 1.873.29 2.308.175.494.634.76 1.303.76.067 0 .137-.003.207-.009.342-.025 1.135-.211 1.135-1.389-.004-7.038-.429-14.696-.84-22.102-.22-3.957-.426-7.694-.575-11.353M43.75 1.538c-2.397 0-4.793-.009-7.189-.018-2.396-.008-4.793-.017-7.191-.017-.522 0-.932.213-1.154.598-.26.452-.228 1.095.08 1.602.246.407.624.64 1.035.626 1.319-.03 3.484.001 4.257.014.375 10.716.896 35.13.901 35.372 0 .743.664 1.131 1.32 1.131.356 0 .69-.111.94-.314.298-.24.455-.582.455-.991 0-8.597-.37-17.944-.73-26.984-.11-2.798-.22-5.556-.315-8.237 1.159-.005 5.282-.018 7.537.043.403.01.773-.21 1.017-.607.314-.514.35-1.194.086-1.653-.21-.365-.581-.565-1.048-.565M64.496.993l-15.87.01c-.39 0-.73.198-.933.544-.258.439-.262 1.043-.012 1.47.195.331.514.514.899.514l4.95-.003c.09 3.663.101 7.86.113 12.3.02 8.416.042 17.118.593 23.937.056.7.8 1.081 1.541 1.081.055 0 .11-.002.167-.007.746-.058 1.216-.49 1.169-1.076-.592-7.33-.723-17.176-.838-25.863-.05-3.725-.097-7.246-.175-10.373l8.35-.005c.741 0 1.129-.654 1.129-1.299 0-.712-.456-1.23-1.083-1.23M79.061 3.861c-.238.02-.68.146-.965.776l-.259.572c-1.253 2.774-2.258 4.998-3.512 8.026-1.202-1.974-5.16-8.649-5.208-8.729-.32-.515-.994-.648-1.568-.308-.573.34-.946 1.109-.41 1.995.485.804.99 1.682 1.476 2.53.596 1.038 1.212 2.112 1.815 3.087.495.8 1.807 3.258 2.021 3.66.064.973.83 13.005.83 24.2 0 .723.382 1.039.61 1.162.183.1.399.15.622.15.285 0 .582-.08.837-.237.405-.249.624-.63.602-1.046-.297-5.613-.291-8.235-.286-10.77.005-2.55.01-5.186-.283-10.833.263-.75 3.175-8.988 4.972-12.334.205-.384.165-.856-.108-1.263-.284-.423-.75-.67-1.186-.638M87.794 19.38l-.125-.21c-1.17-1.982-2.624-4.448-2.686-7.904-.065-3.581 2.964-6.498 3.783-6.962 1.038-.586 1.171-1.235.969-1.613-.232-.434-.994-.71-2.377-.056-2.91 1.374-5.88 5.026-4.67 10.794.604 2.877 1.694 4.956 2.75 6.966a122.76 122.76 0 0 1 .884 1.709c.965 1.869 2.424 4.692 2.869 6.773.575 2.693-.138 6.826-1.388 8.042-.283.275-.566.376-.866.311-.923-.204-1.84.235-2.231 1.064-.367.777-.15 1.62.554 2.146.48.36 1.016.542 1.572.542.378 0 .766-.085 1.15-.254 2.046-.905 3.603-3.904 3.875-7.462.306-3.985-1.136-8.916-4.063-13.885"/>
                        </g>
                    </svg>

                    <svg className="circle" width="133" height="64"
                         viewBox="0 0 133 64">
                        <g fill="none" fillRule="evenodd" strokeWidth="2.4">
                            <path stroke="#FF6864"
                                  d="M98.097 30.765c0 14.561-11.829 26.365-26.42 26.365-14.592 0-30.426-8.056-30.426-26.365C41.251 12.457 57.085 4.4 71.677 4.4c14.591 0 26.42 11.804 26.42 26.365z"/>
                            <path stroke="#FFE861"
                                  d="M102.083 35.367c.553 14.55-8.326 17.965-22.907 18.516-14.58.552-29.343-1.969-29.895-16.52-.552-14.55 10.82-26.792 25.4-27.344 14.582-.551 26.85 10.798 27.402 25.348z"/>
                            <path stroke="#61A9FF"
                                  d="M74.93 53.258c-13.772 4.81-19.655-2.653-24.475-16.397-4.82-13.744-6.751-28.564 7.021-33.374C71.25-1.323 86.321 5.92 91.141 19.663c4.82 13.744-2.438 28.785-16.21 33.595z"/>
                            <path stroke="#61A9FF"
                                  d="M92.322 30s-1.23 18.648-9.961 24.376c-8.732 5.728-28.66 2.78-40.844 2.002-36.344-2.319-60.088 1.14-14.276 4.968 37.487 3.133 58.088-7.638 89.452-5.402 31.365 2.236 38.086 2.362 38.086 2.362"/>
                        </g>
                    </svg>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <a href="#" className="privacy">Privacy Policy</a>
                    <p style={{ fontSize: '12px', marginTop: '15px' }}>© 2019 Kittys</p>
                </div>
            </footer>
        </>
    )
};