import { SortOptions } from "../auth/patient/view/page";

function filterRecords(patients: Record<string, string | string[]>[], filterOptions: Record<string, boolean>, sortByOption: SortOptions, searchQuery: string): Record<string, string | string[]>[] {
    const inputArr = structuredClone(patients);
    const keys = Object.keys(filterOptions);
    const filteredArr = inputArr.filter((item) => {
        let found = false;
        for (let i = 0; i < keys.length; i++) {
            if (filterOptions[`${keys[i]}`]) {
      
                if (keys[i] === 'name' || keys[i] === 'diagnosis' || keys[i] === 'surgery') {
                    //@ts-ignore
                    if (item[keys[i]].toLowerCase().includes(searchQuery)) {
                        console.log(keys[i],item)
                        found = true;
                    }
                }
                else {
                    if (item[keys[i]].includes(searchQuery)) {
                        console.log(keys[i],item)
                        found = true;
                    }
                }

            }
        }
        if (found) {
            return item;
        }
    });
    return filteredArr;
}

export default filterRecords