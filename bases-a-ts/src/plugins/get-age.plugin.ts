

export const calculateAge = (birthdate: string) => {

    return new Date().getFullYear() - new Date(birthdate).getFullYear();
}


