export const CATEGORY_TYPE = 'categorical'
export const NUMERIC_TYPE = 'numeric'

export const categoryFields = {
  elements: [{ name: '', order: 1 }],
}
export const numericFields = {
  min: 0,
  max: 0,
  ascending: true,
  coarsened: false,
  numBins: 1,
  bins: [
    {
      order: 1,
      min: 0,
      max: 0,
    },
  ],
}

export const aboutCopy = {
  title: 'About',
  paragraph: `<p>The reserve system implemented is as described in a 2020 working paper released by a team of researchers from Boston College and MIT: Parag Pathak, Tayfun Sönmez, Utku Ünver, and Bumin Yenmez. The intended use case is for medical rationing. Specifically, a policymaker may need to allocate scarce resources transparently and equitably while prioritizing specific groups of people. A reserve system can be a useful tool in this scenario. A configuration of a reserve system requires three main actions / decisions.</p><br/>
    <p>First, what is the unit being allocated and how many units are available in the particular batch of supply to be rationed?</p><br/>
    <p>Second, what are the groups to be prioritized? This will include specifying each group, how many units are prioritized for each group, and how members of the same group are ranked against each other during allocation. A crucial and potentially unintuitive component of this is that the order in which each group is allocated units can affect outcomes. This is detailed in the working paper.</p><br/>
    <p>Finally, a valid csv of patients must be uploaded. The patient list must have all the data needed to complete the reserve implementation configured and the system will prompt a user with the necessary fields based on the configuration.</p><br/>
    <p>Further information is available throughout the application in the form of information buttons and in the working paper.</p><br/>`,
}

export const unitDefinitionCopyMap = {
  unitType: {
    title: 'What is the unit allocated?',
    definition:
      'The <span style="text-decoration: underline;">unit allocated</span> is the name of the good or service that is being rationed. Examples include monoclonal antibodies, vaccine doses, or supply of remdesivir. It is recommended, but not required, that this is a one word term (e.g. antibodies).',
  },
  unitAllocation: {
    title: 'What is the number of units allocated?',
    definition:
      'The <span style="text-decoration: underline;">number of units allocated</span> is the amount of total supply rationed in the particular allocation instance. For example, if this application is being used to give out 50 vaccine doses to a subset of 500 people, the number of units allocated is 50.',
    faqs: [
      {
        question:
          'Will I be able to change the number of units allocated later?',
        answer:
          'Yes. On a separate page, there is functionality to load a previous configuration in which case this number of units allocated will likely need to be adjusted for the new instance.',
      },
      {
        question: 'Are there any constraints on this?',
        answer:
          'Yes, but they are small. The number of units needs to be greater than 0 and a whole number.',
      },
    ],
  },
}

export const loadDataCopy = {
  faqs: [
    {
      question: 'What should I know about uploading the file?',
      answer:
        'The application will only accept a csv. Patient fields should be in the first row and all required fields must be present. The system will do a check to see if the required fields are present, the data fit the constraints imposed by the configuration, and that there is not missing data.',
    },
    {
      question: 'What is the optional random number field?',
      answer:
        'There is an optional random number field that the application will accept if you would like to supply your own random number. This must be a decimal between 0 and 100000 (inclusive) and the field name must be exactly “random_number”. If either of these conditions are violated, the application will generate its own random number. For each patient, the application will report in the output whether or not it generated a random number and regardless of generated status, will print the random number.',
    },
    {
      question: 'What is the downloadable template?',
      answer:
        'To help in compiling the data, a template file is available for download that contains all the required fields.',
    },
    {
      question: 'What if I want to upload additional fields?',
      answer:
        'If you upload any additional fields, the fields will be persisted to the output file.',
    },
  ],
}

export const reserveInstancesCopy = {
  title: 'What is a reserve instance?',
  definition:
    'A <span style="text-decoration: underline;">reserve instance</span> is a configuration of a reserve system along with a batch of patients that are put through the allocation process. It can be thought of as an allocation instance.',
  faqs: [
    {
      question: 'How do I see results?',
      answer:
        'You are able to export results to a csv. You can choose whether the csv will show only the recipients, only the non-recipients, or all patients entered into the reserve instance. The output will also include a descriptive header detailing the configuration and cataloging the random numbers for ease of auditing.',
    },
    {
      question: 'How do I create a new reserve instance?',
      answer:
        'You are able to add a brand new reserve instance by clicking the button. Alternatively, you can start from an existing configuration.',
    },
  ],
}

export const editReserveCategoryCopyMap = {
  name: {
    title: 'What is the reserve category name?',
    definition:
      'The <span style="text-decoration: underline;">reserve category name</span> is simply how the application will refer to the newly created reserve category. Examples include “clinical trial participants” or “residents of hard hit areas”.',
    faqs: [
      {
        question: 'What is the unreserved default reserve category?',
        answer:
          'The application will automatically create and maintain this reserve category to enforce the constraint that the sum of reserve sizes across all reserve categories must equal the total number of units allocated. You are able to edit this category (it is created with a priority order based only on unique random numbers) or stop using it by setting the size to 0.',
      },
      {
        question: 'Can I change the unreserved default reserve category?',
        answer:
          'You can change it a bit, but no matter how you add or subtract criteria every patient uploaded will qualify for it. If there is no unreserved category in your configuration, we suggest setting the reserve size to 0 and constructing your own reserve categories as opposed to trying to transform the default unreserved category into one that fits with your configuration.',
      },
      {
        question: 'Are there any constraints on naming?',
        answer:
          'Not really. But it is recommended that names are short and descriptive for ease of looking at the allocation results.',
      },
    ],
  },
  size: {
    title: 'What is the reserve size?',
    definition:
      'The <span style="text-decoration: underline;">reserve size</span> is the portion of total supply of the rationed unit that is prioritized for the corresponding reserve category.',
    faqs: [
      {
        question:
          'What are the tradeoffs of setting a reserve category size to be high?',
        answer:
          'The higher the reserve size, the greater the portion of supply of the scarce unit that is available for people who qualify for the corresponding reserve category. By increasing the reserve size for some reserve category, a decision-maker is giving a greater priority to people who qualify for that reserve category.',
      },
      {
        question: 'Will I be able to change the reserve size later?',
        answer:
          'Yes. However, as mentioned above, this will change the likelihood of various populations receiving the rationed unit.',
      },
      {
        question: 'Are there any constraints on the reserve size?',
        answer:
          'Yes. The reserve size must be a whole number greater than 0 and less than or equal to the total number of rationed units. Additionally, the sum of the reserve sizes across all reserve categories must equal the total number of rationed units.',
      },
    ],
  },
  priority: {
    title: 'What is a priority order?',
    definition:
      'A <span style="text-decoration: underline;">priority order</span> is a set of rules to create a ranked list of members of a reserve category. For example, if a decision-maker wants to create a reserve category of size 10 for essential workers, they would also need to specify exactly how to order essential workers to identify the 10 of highest priority. There is a fair amount of flexibility to a priority order. For example, one priority order might be a unique random lottery tiebreaker. Another could be a rank by age (oldest first) with ties broken by a unique random lottery number.',
    faqs: [
      {
        question: 'How do I know how to set a priority order?',
        answer:
          'This is an important policy question and will need to be agreed upon by key decision-makers. Different priority orders can lead to drastically different results - for example ordering essential workers by age with oldest first will clearly lead to very different results compared to ordering essential workers by age with youngest first.',
      },
      {
        question: 'What is a criteria?',
        answer:
          'One way to think about a priority order is as a set of rules that tell you how to sort a list of people. For example, one priority order is sorting by unique random tiebreaker and another might be sorting by age where ties are broken first by height and then by a unique random number. A criteria is then a dimension that is to be sorted on. So in the previous example, criteria might include unique random numbers, age, and height. In other words, criteria are patient data points that can be turned into a ruleset for ordering the patients.',
      },
      {
        question: 'What is a categorical criteria?',
        answer:
          'A categorical criteria is one in which the patient attributes utilized are non-numeric and discrete. For example, one way to order people is by county (based on some ranked list of counties) where ties are broken by unique random numbers. To define a categorical criteria, you must enter all possible values that the criteria will take on and order them from highest-priority to lowest-priority. In a simple county example, this would involve ordering “County 1”, “County 2”, …, “Other County”.',
      },
      {
        question: 'What is a numeric criteria?',
        answer:
          'A numeric criteria is one that uses some number-based patient attribute, for example age, to order patients. To define a numeric criteria, you must enter the minimum possible value of the attribute, the maximum possible value of the attribute, and the direction (ascending or descending) in which to prioritize. The application supports additional functionality to coarsen the numerical attribute into discrete bins that are assumed to cover the full range of patient attribute values.',
      },
      {
        question:
          'How do I know whether my criteria is numeric or categorical?',
        answer:
          'This will depend on whether or not the patient attribute belonging to the criteria can be converted into a number that has some notion of order. For example, while a county can be converted to a number using its U.S. Census FIPS code, there is not a clear idea of whether or not a higher FIPS code implies more or less priority for the county in allocation, so this is likely best as a categorical criteria. On the flip side, if there are two tiers of patients (High Tier and Low Tier), the seemingly discrete values can be quickly converted to a numeric criteria by assigning the high tier to “1” and the low tier to “2” as a pre-processing step.',
      },
      {
        question: 'How many criteria can I add?',
        answer:
          'You can add anywhere from 0 to 3 criteria. The application will always add an additional criteria, a unique random lottery number, that is used to break any remaining ties.',
      },
      {
        question: 'Are there downsides to using more criteria?',
        answer:
          'The main downside is that things quickly become very complicated. If there are many criteria, it can be difficult for a patient to understand exactly their relative priority.',
      },
      {
        question: 'What if I add a criteria that does not break all ties?',
        answer:
          'An additional criteria is always added, a unique random tiebreaker, to break all ties.',
      },
      {
        question:
          'In a numeric criteria, how do I indicate which values are to be ranked higher?',
        answer:
          'The Criteria Data Sorting Order allows you to specify whether the lowest or highest value should receive the greatest priority.',
      },
      {
        question: 'In a numeric criteria, what is coarsening status?',
        answer:
          'Sometimes, you may want to bin the data underlying a numeric criteria. For example, instead of sorting purely on patient age it might make sense to sort on age bins (0-34, 35-44, etc.). If that is desired, selecting “yes” for coarsening status will allow you to implement bins for the numeric criteria.',
      },
      {
        question: 'In a numeric criteria, what are bins?',
        answer:
          'Bins are a way to break up the range of the numeric criteria. So if a numeric criteria is age which ranges from 0 to 120, you can define bins as 0-20, 20-40, and 40-120 that will treat individuals in the same age bin identically along this criteria.',
      },
      {
        question:
          'In a categorical criteria, how do I indicate which values are to be ranked higher?',
        answer:
          'The arrows to the right of the categorical criteria elements allow you to move the possible values up and down the ranked list.',
      },
      {
        question:
          'Are there any constraints I should think about when specifying a categorical criteria?',
        answer:
          'The biggest thing to watch out for is to make sure that all possible categorical criteria elements are entered.',
      },
      {
        question:
          'Are there any constraints I should think about when specifying a numerical criteria?',
        answer:
          'The biggest thing to watch out for is that the minimum and maximum specified are not violated by any patient data uploaded. Additionally, if using a coarsened numeric criteria, bins should be a mutually exclusive and collectively exhaustive cover of the range of the numeric criteria.',
      },
      {
        question: 'Can I change all of this later?',
        answer:
          'Absolutely. At any point in the configuration, you can return to this editing pane.',
      },
    ],
  },
}
