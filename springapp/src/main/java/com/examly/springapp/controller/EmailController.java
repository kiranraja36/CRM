package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.examly.springapp.model.Customer;
import com.examly.springapp.repository.CustomerRepository;
import javax.activation.DataHandler;
import javax.mail.internet.MimeBodyPart;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.activation.DataSource;
import javax.annotation.PostConstruct;
import javax.mail.util.ByteArrayDataSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Properties;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    @Autowired
    private CustomerRepository customerRepository;

    static int email_count;
    
    @PostConstruct
    public void init() {
        email_count = 0;
    }

    public int emailCount(){
        return email_count;
    }

    @PostMapping("/crm/send")
    public String sendEmailToCustomers(@RequestParam("subject") String subject,
                                @RequestParam("body") String body,
                                @RequestParam(value = "attachments", required = false) MultipartFile[] attachments) {
        List<Customer> customers = customerRepository.findAll();
        for (Customer customer : customers) {
            try {
                sendEmailToCustomer(customer, subject, body, attachments);
            } 
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        email_count++;
        return "Emails sent to all customers";
    }

    private void sendEmailToCustomer(Customer customer, String subject, String body, MultipartFile[] attachments) throws Exception {
        String to = customer.getEmail();
        String from = "kiranraja.036@gmail.com";
        String password = "tfldzrojbzatmjdo"; 

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587"); 

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
        message.setSubject(subject);

        MimeBodyPart bodyPart = new MimeBodyPart();
        bodyPart.setText(body);

        MimeMultipart multipart = new MimeMultipart();
        multipart.addBodyPart(bodyPart);

        if (attachments != null) {
            for (MultipartFile attachment : attachments) {
                if (!attachment.isEmpty()) {
                    MimeBodyPart attachmentPart = new MimeBodyPart();
                    DataSource source = new ByteArrayDataSource(attachment.getBytes(), attachment.getContentType());
                    attachmentPart.setDataHandler(new DataHandler(source));
                    attachmentPart.setFileName(attachment.getOriginalFilename());
                    multipart.addBodyPart(attachmentPart);
                }
            }
        }
        message.setContent(multipart);
        Transport.send(message);
    }
}