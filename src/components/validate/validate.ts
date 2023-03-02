
export const validate = (fieldName:string, value: string) : {isValid: boolean | null, error?: string} => {
    switch(fieldName) {
        case 'email' :
            if(value.length === 0) return {isValid: null} 
            const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexpEmail.test(String(value)) ? {isValid: true} : {isValid: false, error: 'email not valid'}
        default :
            return {isValid: true}
    }
}