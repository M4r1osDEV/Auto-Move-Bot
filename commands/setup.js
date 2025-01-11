module.exports = {
    name: 'setup',
    description: "this is a setup command!",
    async execute(message, args, Discord, bot){
        

        //constants
        const wfs = await message.guild.channels.create('📞Waiting-For-Support', { type: 'voice' });
        const wfsid = wfs.id
        const wfscat = await message.guild.channels.create('📞Support', { type: 'category' });
        const wfscatid = wfscat.id
        const logscat = await message.guild.channels.create('🤖LOGS', { type: 'category' });
        const logscatid = logscat.id
        const wfslogs = await message.guild.channels.create('📞WFS-LOGS');
        const wfslogsid = wfslogs.id
        const donate = await message.guild.channels.create('💸Waiting-For-Donate', { type: 'voice' });
        const donateid = donate.id
        const donatecat = await message.guild.channels.create('💸Donate', { type: 'category' });
        const donatecatid = donatecat.id
        const donatelogs = await message.guild.channels.create('💸DONATE-LOGS');
        const donatelogsid = donatelogs.id
        
        
        wfs.setParent(`${wfscatid}`)
        wfslogs.setParent(`${logscatid}`)
        donate.setParent(`${donatecatid}`)
        donatelogs.setParent(`${logscatid}`)
        
        const nots = new Discord.MessageEmbed()
        .setDescription('`Thanks for adding me to your discord | Do not forget to change `' + "<#" + `${wfslogsid}` + ">" + '`permissions`')
        .setColor('00fce9')
        wfslogs.send(nots)

        const nots2 = new Discord.MessageEmbed()
        .setDescription('`Thanks for adding me to your discord | Do not forget to change `' + "<#" + `${donatelogs.id}` + ">" + '`permissions`')
        .setColor('00fce9')
        donatelogs.send(nots2)

        console.log('\x1b[32mSET UP IS DONE!')
        console.log('\x1b[31mENSURE TO CHANGE THE PERMISSIONS OF THE LOGS CHANNEL!')

       
       
       
       
       
        var temporary = [];
        bot.on('voiceStateUpdate', async (oldMember, newMember) => {
            if (newMember.channel == wfsid) {
                await newMember.guild.channels.create(`📞Support`, {
                    type: 'voice', parent: wfscatid, userLimit: 99
                }).then(async channel => {
                    temporary.push({ newID: channel.id, guild: channel.guild });
                    await newMember.setChannel(channel.id);
                    const logsEmbed = new Discord.MessageEmbed()
                    .setDescription(`**Ο ` + "<@" + newMember.id + ">" + ` είναι στο κανάλι**` + " <#" + `${wfsid}` + ">")
                    .addFields(
                        {name: '`Username:`', value: "<@" + newMember.id + ">"},
                        {name: '`ID:`', value: `${newMember.id}`},
                    )
                    .setColor('00fce9')
                    wfslogs.send(logsEmbed)
                });
            }
            if (temporary.length > 0) for (let i = 0; i < temporary.length; i++) {
                let ch = bot.channels.cache.get(temporary[i].newID);
                if (ch.members.size === 0) {
                    await ch.delete();
                    return temporary.splice(i, 1);
                }

        
   
            }
        }); 

        var temporary = [];
        bot.on('voiceStateUpdate', async (oldMember, newMember) => {
            if (newMember.channel == donateid) {
                await newMember.guild.channels.create(`💸Donate`, {
                    type: 'voice', parent: donatecatid, userLimit: 99
                }).then(async channel => {
                    temporary.push({ newID: channel.id, guild: channel.guild });
                    await newMember.setChannel(channel.id);
                    const logsEmbed = new Discord.MessageEmbed()
                    .setDescription(`**Ο ` + "<@" + newMember.id + ">" + ` είναι στο κανάλι**` + " <#" + `${donateid}` + ">")
                    .addFields(
                        {name: '`Username:`', value: "<@" + newMember.id + ">"},
                        {name: '`ID:`', value: `${newMember.id}`},
                    )
                    .setColor('00fce9')
                    donatelogs.send(logsEmbed)
                });
            }
            if (temporary.length > 0) for (let i = 0; i < temporary.length; i++) {
                let ch = bot.channels.cache.get(temporary[i].newID);
                if (ch.members.size === 0) {
                    await ch.delete();
                    return temporary.splice(i, 1);
                }
     }
})

    }

}
