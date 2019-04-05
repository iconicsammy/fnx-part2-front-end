import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

export function currentUserToken(){
	/*
	A function called typically from httpinterceptors to return the currently saved token

	@output: token

	*/

	   const re = new RegExp("ane" + "=([^;]+)");
        var value = re.exec(document.cookie);
        var user_data= (value != null) ? unescape(value[1]) : null;
       return user_data

}




