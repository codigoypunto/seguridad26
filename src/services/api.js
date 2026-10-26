import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdjupsk4Wsjzo-XEYNOdTKcX6LY82-bKA",
    authDomain: "rankingempresas.firebaseapp.com",
    projectId: "rankingempresas",
    storageBucket: "rankingempresas.firebasestorage.app",
    messagingSenderId: "1043186566343",
    appId: "1:1043186566343:web:7b8864b1d7dd77b7aaeae2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getEmpresasBase = () => {
    const custom = JSON.parse(localStorage.getItem('custom_empresas')) || [];
    const base = [
        "ABRATECH", "ACONCAGUA", "ADECCO", "ADEMIN", "AEI SRL", "AK DRILLING", 
        "ALS PERÚ SAC", "AMBIPAR", "AMPHOS", "ANDDES ASOCIADOS", "ANDIKEM", 
        "ANGLOAMERICAN", "APRECIUM", "ATILA", "ATKINSREALIS", "AUSENCO", 
        "B & H CARDENAS S.A.C.", "BBA", "BORNAV SAC", "BRADKEN", "C&R", 
        "CALCESUR SA", "CALICOM", "CATERPILLAR", "CBT", "CERTIFICA", "CIM", 
        "CIME", "CLÍNICA INTERNACIONAL", "CMMS", "CONETEC", "CONTROLTEK", 
        "COSAPI", "CRUBHER", "CTM", "CUMBRA ING.", "CYM", "CYTEC", "D MARTINS", 
        "DESNIVEL", "DIMARZA", "DRILLCO", "DYMAR", "E&P TECNOLOGÍA DEL PERÚ S.A.C", 
        "ECOLAB", "ECOP", "ECOPRENEUR", "ECOSER", "EFC", "EMEMSA", 
        "EMERSON PERÚ SAC", "ENAEX", "ENERGOTEC S.A.C.", "ENGIE ENERGÍA", 
        "EPIROC", "EQUANS", "EQUIMAP", "ERIEZ", "EXPLOMIN", "FDAG", "FERREYROS", 
        "FL SMIDTH", "FLUIDTEK SRL", "FORYMEC", "FSS PERU", "FUNDICION FERROSA SAC", 
        "GEDALIAS", "GESTIONA ACTIVOS", "GLOBAL MAPPING", "GREEN GROUP", 
        "GROWTH STEEL PERU SAC", "GYT", "HAGEMSA", "HAVER & BOECKER ANDINA", 
        "HCL", "HEGATRUX", "IFLUTECH", "IGH PERU", "IMCO", "INDELAT SAC", 
        "INDUMETSA", "INNOMOTICS SAC", "INSIDEO", "INSPECTORATE", "INTERSALES", 
        "ISUR", "JOPAL", "JP PLANNING", "KAMPFER", "KANAY", "KNIGHT PIESOLD", 
        "KOMATSU", "KONECRANES", "KSB PERU", "LASER", "TRANSPORTES LÍNEA", "LIPLATA PERU S.A.", 
        "LIVIGUI", "LO JUSTO", "MAGMA", "MAHUSA", "MAININ", "MAKYL", "MAR S.A.C", 
        "MARCO PERUANA", "METSO", "MOLYCOP", "MORKEN PERU S.A.C", "MOTOROLA SOLUTION", 
        "MOVITECNICA", "NAZCA ENERGY S.A.C.", "NETAXION", "NEUMA PERÚ", "NEWREST", 
        "NOATUM", "OCA GLOBAL", "PINO", "PRECISION", "PRIMAX", "PRODISE", 
        "PROMAP SAC", "PROSERING", "PROTAB", "PRUP SAC", "QUALITAS S.A.", 
        "QUANTEC", "R&Q", "RCING MECÁNICA", "REDERSUR", "RELINING S.A.C.", 
        "RELIPER", "REPSOL", "RUSSELL MINERAL EQUIPMENT S.A.", "SACRUN", "SAEG", 
        "SCAFFOLD", "SCHNEIDER", "SELIN", "SEPERSUR", "SEQUITECSA", "SERIMAN", 
        "SGS", "SINNENS", "SMI", "STANTEC", "STRACON", "SVENDBORG BRAKES PERU S.A.C.", 
        "T&D ELECTRIC SAC", "TECNOMINA", "TICSANI", "TRAMARSA", "TRANSALTISA", 
        "TRANSPORTES ZUÑIGA", "TRIZCON", "UNIMAQ", "V&C", "VAST", "VULCO", 
        "WCARO", "WEG", "WONG", "WSP PERÚ", "ZAMINE SERVICE PERÚ SAC"
    ];
    const combined = [...base, ...custom].map(e => e.toUpperCase());
    return [...new Set(combined)].sort();
};

export const registerNewCompanyDynamic = (compName) => {
    const upper = compName.toUpperCase().trim();
    const custom = JSON.parse(localStorage.getItem('custom_empresas')) || [];
    if (!custom.includes(upper) && !getEmpresasBase().includes(upper)) {
        custom.push(upper);
        localStorage.setItem('custom_empresas', JSON.stringify(custom));
    }
};

export const sendToGoogleForms = (dni, company, lugar) => {
    const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || { syncEnabled: true };
    if (!devSettings.syncEnabled) return;

    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd06phog5gwOmX5eTk3cDdbT6iNfaqZF6eDmoyE1JagAUiD0g/formResponse";
    const formData = new FormData();
    formData.append("entry.897312612", dni);
    formData.append("entry.675767381", company);
    formData.append("entry.1503032104", lugar);

    fetch(googleFormUrl, { method: "POST", mode: "no-cors", body: formData })
        .catch(err => console.error("Error Google Forms:", err));
};

export const sendToFirebase = async (dni, company, lugar) => {
    const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || { syncEnabled: true };
    if (!devSettings.syncEnabled) return;

    try {
        await addDoc(collection(db, "registros"), {
            dni: dni,
            empresa: company.toUpperCase(),
            lugar: lugar.toUpperCase(),
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Error al registrar en Firebase:", e);
    }
};