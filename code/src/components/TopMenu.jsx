import React from 'react'

export default function TopMenu({title}) {
    return (
        <div className="TopHeader">
            <h1 className="title">{title}</h1>
            <div className="HeaderCTRL">
                <button>לצ׳ט עם מייקל</button><button>שמור</button><button>יציאה</button>
            </div>
        </div>
    )
}
