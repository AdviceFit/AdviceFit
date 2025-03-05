module.exports = {
  async up(db, client) {
    const CUSTOM_TEMPLATES = [
      {
        title: "EMERGENCY_GYM_CLOSED_ALERT",
        variables: ["##gymName##", "##Date##"],
        description:
          "Hello, we regret to inform you that the ##gymName## will be closed on ##Date## due to unforeseen circumstances. We apologize for any inconvenience this may cause and appreciate your understanding - Advicefit",
        type: "Transactional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "GYM_TIMING_CHANGE_ALERT",
        variables: ["##gymName##", "##Date##", "##Time##"],
        description:
          "Hello, we wish to inform you that there will be a change in the operating hours at ##gymName##, effective from ##Date##. The new timings will be ##Time##. We appreciate your understanding and cooperation - Advicefit",
        type: "Transactional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "GYM_ADDRESS_CHANGE_ALERT",
        variables: ["##gymName##", "##newAddress##", "##gymMobile##"],
        description:
          "Hello, we are excited to announce that ##gymName## will be relocating to a new, upgraded facility! Our new address is ##newAddress##. For any inquiries or assistance, please feel free to contact us at ##gymMobile## - Advicefit",
        type: "Transactional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "WITH_REASON_GYM_CLOSED_ALERT",
        variables: ["##gymName##", "##Date##", "##Reason##"],
        description:
          "Hello, we regret to inform you that the ##gymName## will be closed on ##Date## due to ##Reason##. We apologize for any inconvenience this may cause and appreciate your understanding - Advicefit",
        type: "Transactional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "OCCASION_GREETING_GYM_CLOSE",
        variables: ["##gymName##", "##date##", "##occasion##"],
        description:
          "Dear User, We wish to inform you that ##gymName## will be closed on ##date## due to ##occasion##. We wish you a joyful celebration - Advicefit",
        type: "Transactional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "GYM_CLOSED_TOMORROW",
        variables: ["##gymName##", "##reasonName##"],
        description:
          "Dear member, ##gymName## regrets to inform you that the gym will be closed tomorrow due to ##reasonName##. Thanks for your cooperation.Regards,##gymName##",
        type: "Promotional",
        services: ["Whatsapp"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "GYM_CLOSED_DATE_RANGE",
        variables: ["##gymName##", "##date##", "##occasion##"],
        description:
          "Dear User, We wish to inform you that ##gymName## will be closed on ##date## due to ##occasion##. We wish you a joyful celebration - Advicefit",
        type: "Promotional",
        services: ["Whatsapp"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "WOMENS_DAY",
        variables: ["##gymName##"],
        description:
          "Happy International Women's Day! Today, we celebrate the strength, resilience, and achievements of all the incredible women in our community. Your dedication to fitness and well-being inspires us every day. Keep shining bright, and thank you for being a vital part of ##gymName## family. - Advicefit",
        type: "Promotional",
        services: ["Whatsapp"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "DISCOUNT_OFFER_ALERT",
        variables: ["##discount##", "##occasion##", "##time##"],
        description:
          "Dear Member, Get ##discount## off on all packages for ##occasion##. Offer ends in ##time##! Enhance your fitness journey with us - Advicefit",
        type: "Promotional",
        services: ["Whatsapp"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title : "NAVARATRI_DISCOUNT_OFFER",
        variables: ["##monthCount##", '##amount##', '##endDate##'],
        description:
          "Happy Navaratri!!! Celebrate the festival with fitness! Get your ##monthCount## gym membership for just ##amount## only. Hurry up, offer valid until ##endDate##. Don’t miss this chance to reach your fitness goals! - Advicefit",
        type: "Promotional",
        services: ["SMS"],
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await db.collection("templates").insertMany(CUSTOM_TEMPLATES);
  },

  async down(db, client) {
    const titles = [
      "EMERGENCY_GYM_CLOSED_ALERT",
      "GYM_TIMING_CHANGE_ALERT",
      "GYM_ADDRESS_CHANGE_ALERT",
      "WITH_REASON_GYM_CLOSED_ALERT",
      "OCCASION_GREETING_GYM_CLOSE",
    ];

    await db.collection("notifications").deleteMany({ title: { $in: titles } });
  },
};
