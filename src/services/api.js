/**
 * Arquitectura Limpia: Servicios Externos
 */

export const sendToGoogleForms = (dni, company, lugar) => {
    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScOEQGcKyg6R1vZQs1BFm3Rt4bi1GNG-dfWdu1PdmjEs_ZqxQ/formResponse";
    
    const formData = new FormData();
    formData.append("entry.1245377513", dni);
    formData.append("entry.1112581719", company);
    formData.append("entry.1612326917", lugar);

    // Envío silencioso
    fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        console.log("Datos enviados en segundo plano a Google Forms.");
    }).catch(err => {
        console.error("Error en el envío silencioso: ", err);
    });
};