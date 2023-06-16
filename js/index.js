class DefaultConfig {

}

class DropDownNavbar {
 
    sideBarClass=".side-navbar";
    closeBtn;
    #sidebar;
    btnDropdown;
    #btnclose=".sidenavbar > button"
    open=false;
    eventWindow=["resize"];
    events=["click", "keydown"];
    keys=["Esc", "Enter"];

    constructor() {
        this.overlay = document.querySelector(".overlay");
        this.#sidebar=document.querySelector(this.sideBarClass);
        this.addEvents();
    }
    
    getSideNavbar() {
        return this.#sidebar;
    }
    
    isOpenSidebar() {
        return this.getSideNavbar().classList.contains("active");
    }
    
    openSidebar(event) {
        if(event instanceof KeyboardEvent) {
            if(event.key == "Enter") {
                if(this.isOpenSidebar()) {
                    return;
                }
                this.getSideNavbar().classList.add("active");
                this.overlay.style.display="block";
            }
        }
        
        if(event instanceof MouseEvent) {
            if(this.isOpenSidebar()) {
                return;
            }
            this.getSideNavbar().classList.add("active");
            this.overlay.style.display="block";
        }
    }

    close() {
        if(!this.isOpenSidebar()) {
            return;
        }
        this.getSideNavbar().classList.remove("active");
        this.overlay.style.display="none";
    }

    closeSidebar(event) {

        if(event instanceof KeyboardEvent) {
            if(event.key == "Escape") {
               this.close();
               return;
            }

            if(event.key == "Enter" && event.target == this.getClosebtn) {
                this.close();
               return;
            }
        }
        
        if(event instanceof MouseEvent) {
           this.close();
           return;
        }
        
        if(event.type == "resize") {
            let innerWidth = event.currentTarget.innerWidth;
            if(innerWidth >= 700 ){
                this.close();
                this.overlay.style.display="none";
                let dropdown = document.querySelectorAll(".side-navbar-dropdown");
                Array.prototype.forEach.call(dropdown, function(e) {
                    e.classList.remove("active");

                })

            }
        }
    }

    getClosebtn() {
        return document.querySelector(this.#btnclose);
    }

    toggle() {
        if(this.open) {
            this.close();
            this.open=false;
            return;
        }
        this.openSidebar();
        this.open=true;
    }

    addEvents() {
        this.closeBtn = this.getClosebtn();
        this.btnDropdown =  document.querySelector(".dropdown-toggle");
        let sideDropdowns = this.#sidebar.querySelectorAll(".side-navbar-item > a:has( +.side-navbar-dropdown)");

        this.events.forEach((e) => {
            this.closeBtn.addEventListener(e, this.closeSidebar.bind(this));
            this.btnDropdown.addEventListener(e, this.openSidebar.bind(this));
        })

        this.eventWindow.forEach((e) =>{
            window.addEventListener(e, this.closeSidebar.bind(this));
        })

        document.addEventListener("keydown",this.closeSidebar.bind(this), true);
        
        Array.prototype.forEach.call(sideDropdowns, (element)=> {

            this.events.forEach((e)=> {
                element.addEventListener(e, (event)=> {
                    let dropdown = event.target.parentElement.querySelector(".side-navbar-dropdown");
                    if( event instanceof MouseEvent) {
                        dropdown.classList.toggle("active");
                        return;
                    }
                 })
            }, true);
        })
               
    }
}

let instance = new DropDownNavbar();
