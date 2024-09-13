export function buildCurrentPath(pathname:string): string {

    let currentPath = "";

    if( pathname.split("/") ){
        for (let index = 0; index < pathname.split("/").length; index++) {
            if( index > 1){
                const element = pathname.split("/")?.[index];
                currentPath = !currentPath ? element : currentPath+":"+element
            }
        }
    }
    return currentPath;
}