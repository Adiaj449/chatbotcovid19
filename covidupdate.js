// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class CovidUpdate extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if (context.activity.text == "Covid'19 Symptoms") {
                const { MessageFactory, CardFactory } = require('botbuilder');

                const card = CardFactory.heroCard(
                    'Covid 19 Symptoms',
                    ['https://www.who.int/images/default-source/wpro/health-topic/covid-19/slide2069e18f870374cec818c01cae6a57c13.jpg?sfvrsn=77a95407_2'],
                     
                );
                const message = MessageFactory.attachment(card);
                await context.sendActivity(message);
                await this.suggestedActions(context);
                await next();
               
            } else if(context.activity.text == `Immunity Booster Covid'19`){
                const { MessageFactory, CardFactory } = require('botbuilder');

                const card = CardFactory.heroCard(
                    'Boost your Immunity for Corona Virus',
                    ['https://s3-us-west-2.amazonaws.com/utsw-patientcare-web-production/original_images/immune_boosting_foods_1080_x_1080-01.jpg'],
                     
                );
                const message = MessageFactory.attachment(card);
                await context.sendActivity(message);
                await this.suggestedActions(context);
                await next();
            }
            else if(context.activity.text == `HELPLINE`){
                const replyText = `Please Enter State  : ${context.activity.text}`;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                context.wait();
                if(context.activity.text == "MH"){
                    const replyText = `MH I did't get your query, Please repharse it: ${context.activity.text}`;
                    await context.sendActivity(MessageFactory.text(replyText, replyText));
                    await next();
                }
                else
                {
                    await next();
                }
            }
            else {
               // console.log(context.activity.text);
                const replyText = `Sorry I did't get your query, Please repharse it: ${context.activity.text}`;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            }  
        });

        this.onMembersAdded(async (context, next) => {
            await this.sendWelcomeMessage(context);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
    async sendWelcomeMessage(turnContext) {
        const membersAdded = turnContext.activity.membersAdded;
        const welcomeText = 'Hello and welcome!';
        for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
            if (membersAdded[cnt].id !== turnContext.activity.recipient.id) {
                await turnContext.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                await this.suggestedActions(turnContext);
            }
        }
    }
    async suggestedActions(turnContext) {
        var replyMessage = MessageFactory.suggestedActions(["Covid'19 Symptoms", "Covid`19 Helpline Number", "Covid'19 Guidlines","Immunity Booster Covid'19"]);
        await turnContext.sendActivity(replyMessage);
    }
}

module.exports.CovidUpdate = CovidUpdate;
