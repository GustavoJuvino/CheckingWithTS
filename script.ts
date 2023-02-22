interface UserData {
    name?: string;
    email?: string;
    phoneNumber?: number;
}

// UserData TypeGuard
function isUserData(obj: unknown) : obj is UserData{
    if (
        obj &&
        typeof obj === 'object' &&
        ('name' in obj || 'email' in obj || 'phoneNumber' in obj)
      ) {
        return true;
      } else {
        return false;
      }
};

interface Window {
    UserData: any;
}

window.UserData = {};

// Validating JSON
function validJSON(str: string){
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
};

function loadLocalStorage() {
    const localUserData = localStorage.getItem('UserData');
    if (localUserData && validJSON(localUserData)) {
      const UserData = JSON.parse(localUserData);
      if (isUserData(UserData)) {
        Object.entries(UserData).forEach(([key, value]) => {
          const input = document.getElementById(key);
          if (input instanceof HTMLInputElement) {
            input.value = value;
            window.UserData[key] = value;
          }
        });
      }
    }
  }
  
  loadLocalStorage();

function handleInput({ target }: KeyboardEvent){
    if(target instanceof HTMLInputElement) {
        window.UserData[target.id] = target.value;
        localStorage.setItem("UserData", JSON.stringify(window.UserData));
    }
};

const form = document.querySelector<HTMLElement>("#form");
form?.addEventListener("keyup", handleInput);