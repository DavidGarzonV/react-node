import React from 'react'; // let's also import Component
import { setTimeout } from 'timers';

type PropsAlert = {
    type:string,
    message:string,
    hide?:boolean
}

type alertState = {
    visible: boolean
}

export class Alert extends React.Component<PropsAlert,alertState> {
    
    state = {
        visible: false
    }

    componentWillMount(){
        if (this.props.hide) {
            setTimeout(() => {
                this.setState({visible:false})
            }, 5000);
        }else{
            this.setState({visible:true})
        }
    }

    render() {
        return (
            <>
            {this.state.visible && 
                <div className="alertMessage" >
                    <div className={"alert "+this.props.type}>
                        {this.props.message}
                    </div>
                </div>
            }
            </>
        );
    }
}