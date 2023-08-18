package com.examly.springapp.sms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;


@Component
public class SmsService {


    private final String ACCOUNT_SID ="AC9b27dee174a1485739b023c66c0e59d0";
    private final String AUTH_TOKEN = "edb91d42f3af943bcb801a2a883ac048";
    private final String FROM_NUMBER = "+15735494529";



    public void send(SmsDTO sms) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message.creator(new PhoneNumber(sms.getPhone()), new PhoneNumber(FROM_NUMBER), sms.getMessage())
                .create();
        System.out.println("here is my id:"+message.getSid());// Unique resource ID created to manage this transaction

    }

    public void receive(MultiValueMap<String, String> smscallback) {
    }

}