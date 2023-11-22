'use client';
import Link from 'next/link'

export default function NavComponent(){
    return(
        <div>
            <NavBar />
        </div>
    )
}

function NavBar(){
    return(
        <div>
            <nav class="navbar bg-light">
                <div class="container-fluid">
                    <Link href={"/"} className={"navbar-brand"}>Note</Link>
                    <div>
                        <Link className={"text-primary text-decoration-none me-2"} href={"/"}>Home</Link>
                        <Link 
                            className={"text-primary text-decoration-none me-2 border"} 
                            href={"/note/create"}>
                                New Note
                            <i className={"bi bi-plus"}></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}