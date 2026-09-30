import { CampusDocument } from '../types';

export const SAMPLE_DOCUMENTS: CampusDocument[] = [
  {
    id: 'doc-001',
    code: 'ACAD-REG-2025-26',
    title: 'Academic Regulations & Curriculum Guidelines',
    category: 'Academic',
    lastUpdated: '2025-08-15',
    chunksCount: 42,
    status: 'Indexed',
    version: 'v4.2',
    fileType: 'PDF',
    summary: 'Official regulations governing credit distribution, minimum CGPA requirements, course registration, grading system, and promotion criteria.',
    sections: [
      {
        id: 'sec-acad-1',
        title: 'Credit Distribution & Minimum CGPA Requirements',
        content: `Students must earn a minimum of 160 credits across eight semesters for the award of B.Tech / B.E. degree. A minimum Cumulative Grade Point Average (CGPA) of 5.0 is mandatory for graduation. Students with CGPA below 5.0 at the end of the academic year will be placed on academic probation. Remedial tutorial sessions and faculty mentoring are mandatory for students on probation.`
      },
      {
        id: 'sec-acad-2',
        title: 'Grading System & Semester Grade Point Average (SGPA)',
        content: `The institution follows a 10-point absolute grading scale: O (Outstanding, Grade Point 10, marks >= 90%), A+ (Excellent, Grade Point 9, 80-89%), A (Very Good, Grade Point 8, 70-79%), B+ (Good, Grade Point 7, 60-69%), B (Above Average, Grade Point 6, 50-59%), C (Pass, Grade Point 5, 45-49%), and F (Fail, Grade Point 0, < 45%). SGPA is computed as sum of (Credits × Grade Points) divided by total registered credits in that semester.`
      },
      {
        id: 'sec-acad-3',
        title: 'Course Add/Drop & Elective Registration',
        content: `Course registration opens two weeks prior to semester commencement on the student portal. Students may add or drop open elective courses within the first 10 instructional working days of the semester without penalty. Late registration incurs a administrative fee of ₹500. Maximum credit limit per semester is 26 credits.`
      },
      {
        id: 'sec-acad-4',
        title: 'Re-evaluation and Grade Review Procedure',
        content: `Candidates seeking re-evaluation of end-semester theory answer scripts must apply within 7 working days from the declaration of results. The re-evaluation fee is ₹600 per course. A photocopy of the evaluated script can be obtained for ₹300 prior to applying for re-evaluation.`
      }
    ]
  },
  {
    id: 'doc-002',
    code: 'EXAM-GUIDE-2025',
    title: 'Examination Guidelines & Malpractice Rules',
    category: 'Examination',
    lastUpdated: '2025-09-02',
    chunksCount: 28,
    status: 'Indexed',
    version: 'v2.1',
    fileType: 'PDF',
    summary: 'Guidelines for continuous internal assessments, end-semester examinations, hall ticket generation, and disciplinary actions for malpractice.',
    sections: [
      {
        id: 'sec-exam-1',
        title: 'Semester Examination Schedule & Hall Tickets',
        content: `Semester end examinations are conducted in two sessions daily: Morning Session (09:30 AM to 12:30 PM) and Afternoon Session (02:00 PM to 05:00 PM). Hall tickets will be made available for download on the student portal 5 days before the first examination date. Candidates must carry their college ID card along with a printed, clear hall ticket to all examination halls. Entry is denied after 15 minutes of exam commencement.`
      },
      {
        id: 'sec-exam-2',
        title: 'Continuous Assessment Tests (CAT / Internal Exams)',
        content: `Three Continuous Assessment Tests (CAT-1, CAT-2, and CAT-3) are scheduled per semester. The best two out of three performances are considered for 30 internal marks. An additional 10 marks are allocated for assignments, quizzes, and micro-projects, and 10 marks for class participation and attendance, totaling 50 internal assessment marks.`
      },
      {
        id: 'sec-exam-3',
        title: 'Examination Malpractice & Disciplinary Penalties',
        content: `Carrying mobile phones, smartwatches, programmable calculators, or handwritten chits into the examination hall is strictly prohibited and classified as Tier-1 malpractice. Penalties include cancellation of the respective course examination, debarment from remaining examinations of that session, and reporting to the Examination Disciplinary Board. Severe offences result in one-year suspension.`
      },
      {
        id: 'sec-exam-4',
        title: 'Arrear and Supplementary Examination Rules',
        content: `Students with backlog/arrear courses can register for supplementary examinations conducted immediately following the regular semester exam results. Supplementary exam fee is ₹450 per theory paper and ₹600 per laboratory course. Supplementary examinations allow students to clear failed courses without waiting for the full academic cycle.`
      }
    ]
  },
  {
    id: 'doc-003',
    code: 'ATT-POL-2025',
    title: 'Student Attendance Policy & Condonation Rules',
    category: 'Student Policy',
    lastUpdated: '2025-07-20',
    chunksCount: 15,
    status: 'Indexed',
    version: 'v3.0',
    fileType: 'PDF',
    summary: 'Mandatory minimum attendance criteria of 75%, medical leave relaxation, condonation fees, and criteria for debarment from end-semester exams.',
    sections: [
      {
        id: 'sec-att-1',
        title: 'Minimum Attendance Requirement (75% Rule)',
        content: `All enrolled students must secure a minimum attendance of 75% in aggregate across all registered courses, as well as at least 75% in each individual theory and laboratory subject during the instructional semester. Students with attendance between 65% and 74% may be eligible for condonation on valid medical grounds or official institutional representation.`
      },
      {
        id: 'sec-att-2',
        title: 'Medical Condonation & Relaxation Guidelines',
        content: `Condonation of shortage of attendance between 65% and 74.9% may be granted by the Academic Council upon submission of a valid registered Medical Practitioner certificate and discharge summary within 3 days of resuming college. A condonation processing fee of ₹1,200 per semester applies upon approval. Shortage of attendance below 65% cannot be condoned under any circumstances.`
      },
      {
        id: 'sec-att-3',
        title: 'Debarment from End-Semester Examinations',
        content: `Students having less than 65% attendance in any course will be detained/debarred from appearing in the end-semester examination for that course. Such students must re-register and repeat the course in subsequent semesters during summer term or whenever the course is next offered by the department.`
      },
      {
        id: 'sec-att-4',
        title: 'On-Duty (OD) Attendance for Competitions & Sports',
        content: `Students representing the college in state/national sports, cultural fests, hackathons, or NCC/NSS events are granted On-Duty (OD) attendance up to a maximum of 15 instructional days per semester. Prior approval must be obtained from the Head of the Department and the Faculty Coordinator with supporting invitation letters.`
      }
    ]
  },
  {
    id: 'doc-004',
    code: 'STU-LEAVE-2025',
    title: 'Student Leave Rules & Application Process',
    category: 'Student Policy',
    lastUpdated: '2025-08-01',
    chunksCount: 18,
    status: 'Indexed',
    version: 'v2.4',
    fileType: 'PDF',
    summary: 'Procedures for applying for casual leave, medical leave, duty leave, and hostel leave approvals through the student portal.',
    sections: [
      {
        id: 'sec-leave-1',
        title: 'Casual Leave & Absence Notification',
        content: `Students may take up to 3 consecutive days of casual absence by submitting an online leave application via the EduPortal at least 24 hours in advance, endorsed by the student proctor or faculty mentor. Absence exceeding 3 days requires written parent consent communicated directly to the Head of Department.`
      },
      {
        id: 'sec-leave-2',
        title: 'Medical Leave Documentation Requirements',
        content: `For any medical absence exceeding 2 days, a formal medical fitness certificate issued by an authorized Medical Practitioner along with hospital prescription slips must be submitted to the college dispensary and HOD office within 48 hours of return to campus. Medical leave without timely submission will be treated as unauthorized absence.`
      },
      {
        id: 'sec-leave-3',
        title: 'Hostel Outstation & Night Leave Permission',
        content: `Hostel residents wishing to leave campus overnight or visit local guardians must apply for an Outstation Gate Pass on the hostel portal 24 hours prior. Approval from both the Hostel Warden and parental SMS/call verification is mandatory. Curfew timing for regular days is 08:30 PM for campus entry.`
      }
    ]
  },
  {
    id: 'doc-005',
    code: 'PLACE-CIRC-2025-A',
    title: 'Placement Cell Circular & Recruitment Regulations',
    category: 'Placement',
    lastUpdated: '2025-08-25',
    chunksCount: 21,
    status: 'Indexed',
    version: 'v1.8',
    fileType: 'PDF',
    summary: 'Placement policies, eligibility criteria (CGPA >= 6.5, zero active backlogs), one-student-one-job policy, and dream company options.',
    sections: [
      {
        id: 'sec-place-1',
        title: 'Placement Registration & Eligibility Criteria',
        content: `Final year students and pre-final year internship applicants must register with the Career Development & Placement Cell (CDPC). General eligibility criterion for on-campus drives is a minimum CGPA of 6.50 across all completed semesters with no active/standing arrears/backlogs. Individual visiting companies may impose higher CGPA cut-offs (e.g., 7.5+ or 8.0+ for product companies).`
      },
      {
        id: 'sec-place-2',
        title: 'One-Student One-Offer Policy & Dream Option',
        content: `To maximize job offers across the batch, the college enforces a strict 'One-Student One-Job' policy. Once an offer with compensation under ₹7.0 LPA is secured, the candidate is locked. However, students may attempt up to two 'Dream Offers' (CTC >= ₹10.0 LPA) or 'Super Dream Offers' (CTC >= ₹18.0 LPA) if invited by tier-1 recruiters.`
      },
      {
        id: 'sec-place-3',
        title: 'Placement Code of Conduct & Interview Etiquette',
        content: `Registered students must appear in formal business attire (college blazer, formal shirt and trousers, formal shoes). Carrying smart devices or cheating during online assessment tests results in immediate blacklisting from all remaining campus placement drives for the entire academic session. Backing out of an accepted job offer without HOD clearance is strictly prohibited.`
      },
      {
        id: 'sec-place-4',
        title: 'Pre-Placement Training & Mock Assessment Sessions',
        content: `Mandatory 60-hour pre-placement training modules covering quantitative aptitude, logical reasoning, data structures & algorithms, technical interview drills, and resume writing are conducted in the 6th and 7th semesters. Maintaining 90% attendance in training sessions is required to remain eligible for placement drives.`
      }
    ]
  },
  {
    id: 'doc-006',
    code: 'ACAD-CAL-2025-26',
    title: 'Semester Timetable & Academic Calendar 2025-2026',
    category: 'Timetable',
    lastUpdated: '2025-07-10',
    chunksCount: 16,
    status: 'Indexed',
    version: 'v1.0',
    fileType: 'PDF',
    summary: 'Official calendar dates for semester commencement, Continuous Assessment Tests (CAT), mid-term recess, study holidays, and end-semester examinations.',
    sections: [
      {
        id: 'sec-time-1',
        title: 'Odd Semester Key Dates (Monsoon Session)',
        content: `Odd Semester Academic Dates:
- Class Commencement: August 1, 2025
- Continuous Assessment Test 1 (CAT-1): September 15 - September 20, 2025
- Mid-Semester Recess / Cultural Fest: October 18 - October 23, 2025
- Continuous Assessment Test 2 (CAT-2): November 10 - November 15, 2025
- Last Working Day of Instructional Classes: November 28, 2025
- Practical / Laboratory Examinations: December 1 - December 8, 2025
- Semester End Theory Examinations: December 12 - December 30, 2025
- Winter Vacation: January 1 - January 14, 2026.`
      },
      {
        id: 'sec-time-2',
        title: 'Even Semester Key Dates (Spring Session)',
        content: `Even Semester Academic Dates:
- Class Commencement: January 15, 2026
- Continuous Assessment Test 1 (CAT-1): March 2 - March 7, 2026
- Annual Sports Meet & Tech Fest: March 24 - March 28, 2026
- Continuous Assessment Test 2 (CAT-2): April 13 - April 18, 2026
- Last Working Day: May 2, 2026
- End-Semester Theory Exams: May 12 - June 2, 2026
- Summer Vacation / Mandatory Internship: June 3 - July 28, 2026.`
      },
      {
        id: 'sec-time-3',
        title: 'Daily Class Schedule & Bell Timings',
        content: `Instructional hours run from Monday through Friday:
- Period 1: 08:30 AM - 09:25 AM
- Period 2: 09:25 AM - 10:20 AM
- Morning Tea Break: 10:20 AM - 10:40 AM
- Period 3: 10:40 AM - 11:35 AM
- Period 4: 11:35 AM - 12:30 PM
- Lunch Break: 12:30 PM - 01:25 PM
- Period 5 & 6 (Laboratory / Electives): 01:25 PM - 03:15 PM
- Period 7 (Sports / Mentorship / Clubs): 03:15 PM - 04:15 PM.`
      }
    ]
  },
  {
    id: 'doc-007',
    code: 'STU-CONDUCT-2025',
    title: 'Student Code of Conduct & Campus Discipline',
    category: 'Student Policy',
    lastUpdated: '2025-06-30',
    chunksCount: 19,
    status: 'Indexed',
    version: 'v3.2',
    fileType: 'PDF',
    summary: 'Institutional regulations on identity cards, anti-ragging compliance, laboratory safety, digital etiquette, and disciplinary procedures.',
    sections: [
      {
        id: 'sec-conduct-1',
        title: 'Identity Cards & Campus Entry Protocol',
        content: `Students must wear their official RFID-enabled Student Identity Card visibly on a lanyard at all times within the academic blocks, laboratories, library, and campus gates. Security personnel are authorized to deny campus access to any individual without a valid ID. Loss of ID card must be reported immediately with an FIR receipt and re-issuance fee of ₹350.`
      },
      {
        id: 'sec-conduct-2',
        title: 'Zero Tolerance Anti-Ragging Policy',
        content: `Ragging in any form—verbal abuse, teasing, harassment, intimidation, or coercive activity—is strictly prohibited under Supreme Court directives and state law. Any student found guilty of ragging is liable for immediate expulsion from the college, confiscation of fees, and filing of a non-bailable criminal complaint. The 24/7 Anti-Ragging Helpline is 1800-180-5522.`
      },
      {
        id: 'sec-conduct-3',
        title: 'Laboratory Safety Regulations & Etiquette',
        content: `Students must wear designated cotton lab coats and closed-toe safety footwear in chemistry, physics, and manufacturing workshops. Long hair must be tied back. Use of personal mobile phones or consuming food/beverages inside laboratories is prohibited. Damaging equipment through negligence will result in repair liability plus a fine.`
      }
    ]
  },
  {
    id: 'doc-008',
    code: 'STAFF-LEAVE-2025',
    title: 'Faculty & Staff Leave Policy & Service Regulations',
    category: 'Administration',
    lastUpdated: '2025-08-10',
    chunksCount: 24,
    status: 'Indexed',
    version: 'v2.0',
    fileType: 'PDF',
    summary: 'Leave rules for teaching faculty and non-teaching staff including casual leave, earned leave, academic on-duty (OD), maternity, and research leave.',
    sections: [
      {
        id: 'sec-staff-1',
        title: 'Casual Leave (CL) & Restricted Holidays',
        content: `Full-time faculty members and administrative staff are entitled to 12 days of Casual Leave (CL) per calendar year, credited on a pro-rata basis. CL cannot be combined with vacation or earned leave. Up to 2 Restricted Holidays (RH) can be availed from the list of declared institutional optional holidays with prior approval from HOD.`
      },
      {
        id: 'sec-staff-2',
        title: 'On-Duty (OD) Leave for Research & Conferences',
        content: `Faculty members are granted up to 14 days of Academic On-Duty (OD) leave per academic year for presenting research papers in peer-reviewed conferences, attending FDPs, workshops, PhD viva voce, and university examination duties. Financial assistance of up to ₹25,000 is available for Scopus/WoS indexed international conference presentations.`
      },
      {
        id: 'sec-staff-3',
        title: 'Earned Leave (EL) & Vacation Entitlement',
        content: `Teaching faculty are entitled to 30 days of summer vacation and 15 days of winter vacation per academic year, provided non-vacation duties are fulfilled. Non-vacation administrative staff accrue 30 days of Earned Leave (EL) per year, with maximum accumulation permitted up to 240 days.`
      },
      {
        id: 'sec-staff-4',
        title: 'Maternity and Paternity Leave Provisions',
        content: `Female staff members with at least one year of continuous service are entitled to 180 days of paid Maternity Leave for up to two surviving children. Male employees are entitled to 15 days of paid Paternity Leave to be availed within six months of child delivery.`
      }
    ]
  },
  {
    id: 'doc-009',
    code: 'GEN-CIRC-2025',
    title: 'College General Circular & Campus Facilities Information',
    category: 'General',
    lastUpdated: '2025-09-01',
    chunksCount: 17,
    status: 'Indexed',
    version: 'v1.4',
    fileType: 'PDF',
    summary: 'Campus operational hours, central library guidelines, high-speed Wi-Fi onboarding, cafeteria timings, parking regulations, and healthcare center.',
    sections: [
      {
        id: 'sec-gen-1',
        title: 'Campus Operating Hours & Gates Access',
        content: `The main campus gates open at 06:00 AM and close at 09:30 PM for day scholars. Academic buildings are operational from 08:00 AM to 06:30 PM. The Central Library remains open on all working days from 08:00 AM to 10:00 PM and on Saturdays/Sundays from 09:00 AM to 05:00 PM during examination months.`
      },
      {
        id: 'sec-gen-2',
        title: 'Campus High-Speed Wi-Fi & Cyber Usage Policy',
        content: `High-speed Wi-Fi (SSID: 'CampusSecure-5G') is accessible to all students and staff. Registration requires student ID login and MAC address whitelisting via the Network Operations Center (NOC) portal. Streaming video games, torrenting, accessing non-academic adult portals, or bypassing firewall rules through unauthorized VPNs is strictly prohibited and results in MAC ban.`
      },
      {
        id: 'sec-gen-3',
        title: 'Vehicle Parking & Two-Wheeler Helmet Rule',
        content: `All students driving two-wheelers must wear ISI-certified helmets and hold a valid driving license. Entry without helmets is forbidden. Vehicles must be parked solely in Designated Student Parking Lots A and B. Four-wheelers for day scholar students are strictly prohibited inside academic zones without special disability permits.`
      },
      {
        id: 'sec-gen-4',
        title: 'Campus Health Center & Ambulance Services',
        content: `The 24/7 Campus Health Center is located adjacent to Student Hostel Block C. It is staffed by two residential medical officers and trained nursing staff. Emergency medicines, primary trauma care, and an on-call ambulance service (Hotline: 080-2849-9999) are provided free of cost to students and faculty.`
      }
    ]
  },
  {
    id: 'doc-010',
    code: 'INTERN-GUIDE-2025',
    title: 'Student Internship Guidelines & Industrial Training',
    category: 'Academic',
    lastUpdated: '2025-08-18',
    chunksCount: 20,
    status: 'Indexed',
    version: 'v2.2',
    fileType: 'PDF',
    summary: 'Guidelines for summer and semester internships, No Objection Certificate (NOC) procedure, mentor allocation, and credit transfer policy.',
    sections: [
      {
        id: 'sec-intern-1',
        title: 'Mandatory Internship Duration & Requirements',
        content: `Under the AICTE curriculum framework, every undergraduate student must complete a minimum of 6 to 8 weeks of industrial internship before entering the 7th semester. Internships can be undertaken in industrial organizations, research labs (CSIR, DRDO, ISRO), or reputed startups approved by the Department Internship Committee.`
      },
      {
        id: 'sec-intern-2',
        title: 'No Objection Certificate (NOC) Application Procedure',
        content: `Students securing external internships must obtain an official No Objection Certificate (NOC) before joining. The application requires an offer letter specifying stipend, job role, start date, and mentor details. The NOC request must be endorsed by the Faculty Mentor and approved by the HOD through the Internship Portal.`
      },
      {
        id: 'sec-intern-3',
        title: 'Evaluation, Viva Voce & Credit Transfer',
        content: `Upon completion, students must submit: (1) Official Internship Completion Certificate, (2) Weekly progress logs signed by the industry supervisor, and (3) A comprehensive technical report. A departmental viva voce is held in the beginning of the odd semester to award 2 academic credits for the internship.`
      }
    ]
  },
  {
    id: 'doc-011',
    code: 'SCHOL-AID-2025',
    title: 'Scholarship Schemes & Financial Aid Guidelines',
    category: 'Student Policy',
    lastUpdated: '2025-07-28',
    chunksCount: 14,
    status: 'Indexed',
    version: 'v1.5',
    fileType: 'PDF',
    summary: 'Merit-cum-means scholarships, state government concessions, institutional fee waivers, and application timelines.',
    sections: [
      {
        id: 'sec-schol-1',
        title: 'Merit Scholarships for Top Performers',
        content: `The institution awards tuition fee waivers to academic toppers: Top 2% students in each branch receive 50% tuition waiver for the following academic year, provided CGPA is >= 9.0 with no standing backlogs. Top 5% receive a 25% waiver with CGPA >= 8.5.`
      },
      {
        id: 'sec-schol-2',
        title: 'Means-Based Aid & Government Schemes',
        content: `Students with annual family income below ₹2.50 Lakhs can apply for national scholarship portals (NSP), post-matric schemes, and the institutional alumni hardship fund. Applications open in August and close by October 31 each year.`
      }
    ]
  },
  {
    id: 'doc-012',
    code: 'LIB-RULES-2025',
    title: 'Central Library Regulations & Digital Resource Access',
    category: 'General',
    lastUpdated: '2025-08-05',
    chunksCount: 16,
    status: 'Indexed',
    version: 'v2.1',
    fileType: 'PDF',
    summary: 'Book borrowing limits, overdue fine structure, IEEE/Springer digital library credentials, and discussion room bookings.',
    sections: [
      {
        id: 'sec-lib-1',
        title: 'Borrowing Quota & Renewal Period',
        content: `Undergraduate students may borrow up to 4 books simultaneously for a duration of 14 calendar days. Postgraduates may borrow up to 6 books for 21 days. Online renewals are permitted twice through the OPAC portal if no hold has been placed by another user.`
      },
      {
        id: 'sec-lib-2',
        title: 'Overdue Fines & Lost Book Replacement',
        content: `An overdue fine of ₹5 per day per volume is levied for overdue returns. For books overdue past 30 days, the user must replace the book with the latest edition plus pay a processing fee of ₹150. Reference section books and journals are not issued for home reading.`
      },
      {
        id: 'sec-lib-3',
        title: 'Digital Library & Research Database Access',
        content: `Access to IEEE Xplore, ScienceDirect, ACM Digital Library, and Springer Nature is available on-campus via IP authentication and remotely via the Knimbus remote access platform using institutional email IDs.`
      }
    ]
  },
  {
    id: 'doc-013',
    code: 'HOSTEL-MAN-2025',
    title: 'Student Residential Hostel Manual & Mess Rules',
    category: 'Student Policy',
    lastUpdated: '2025-07-15',
    chunksCount: 22,
    status: 'Indexed',
    version: 'v3.1',
    fileType: 'PDF',
    summary: 'Hostel room allotment rules, mess food committee guidelines, silence hours, and room inspection protocols.',
    sections: [
      {
        id: 'sec-hostel-1',
        title: 'Hostel Allotment & Room Inventory',
        content: `Hostel rooms are allotted on a first-come, first-served basis during admission registration. Residents are responsible for furniture and electrical fixtures. Damaging or painting on hostel walls attracts a minimum repair fine of ₹1,000 per occupant.`
      },
      {
        id: 'sec-hostel-2',
        title: 'Mess Timings & Special Diets',
        content: `Hostel mess serves four daily meals: Breakfast (07:00 AM - 08:30 AM), Lunch (12:15 PM - 02:00 PM), Evening Snacks (05:00 PM - 06:00 PM), and Dinner (07:30 PM - 09:30 PM). Special sick diet (porridge, milk, boiled fruits) is provided upon request to the Mess Supervisor.`
      },
      {
        id: 'sec-hostel-3',
        title: 'Silence Hours & Electrical Appliances',
        content: `Silence hours are strictly enforced between 10:30 PM and 06:00 AM. High-power heating appliances such as immersion coils, electric kettles, induction stoves, and room heaters are strictly banned due to fire safety protocols. Possession leads to confiscation and ₹2,000 penalty.`
      }
    ]
  },
  {
    id: 'doc-014',
    code: 'SPORTS-POL-2025',
    title: 'Department of Physical Education & Sports Facilities Policy',
    category: 'General',
    lastUpdated: '2025-07-22',
    chunksCount: 12,
    status: 'Indexed',
    version: 'v1.2',
    fileType: 'PDF',
    summary: 'Sports complex timings, gym membership, inter-collegiate tournament selections, and equipment borrowing.',
    sections: [
      {
        id: 'sec-sports-1',
        title: 'Sports Complex Hours & Gymnasium Access',
        content: `The Indoor Sports Complex and Fitness Gymnasium operate from 06:00 AM to 08:30 AM and 04:30 PM to 08:00 PM on all weekdays. Students must carry clean athletic indoor shoes and a hand towel. University team selections are held in August every year.`
      }
    ]
  },
  {
    id: 'doc-015',
    code: 'RESEARCH-POL-2025',
    title: 'Student Innovation, IPR & Patent Support Policy',
    category: 'Academic',
    lastUpdated: '2025-08-12',
    chunksCount: 15,
    status: 'Indexed',
    version: 'v1.0',
    fileType: 'PDF',
    summary: 'Institutional funding for student patents, incubator seed money up to ₹1,00,000, and intellectual property ownership guidelines.',
    sections: [
      {
        id: 'sec-res-1',
        title: 'Institutional Seed Grant for Student Projects',
        content: `Undergraduate student teams with verified hardware or software prototypes can apply for seed grants up to ₹1,00,000 per project from the Campus Innovation Council. The grant covers raw materials, cloud compute, testing, and patent filing costs.`
      },
      {
        id: 'sec-res-2',
        title: 'Patent Filing and IP Sharing Policy',
        content: `Patents resulting from campus research with college funding are filed with joint authorship between student inventors and the institution. The college covers 100% of filing and examination fees. Commercial royalties are shared 70% to student inventors and 30% to the institution.`
      }
    ]
  },
  {
    id: 'doc-016',
    code: 'TRANS-CIRC-2025',
    title: 'Campus Bus Transport & Route Timings',
    category: 'General',
    lastUpdated: '2025-07-18',
    chunksCount: 14,
    status: 'Indexed',
    version: 'v1.2',
    fileType: 'PDF',
    summary: 'College bus fleet operational across 32 routes in the city, annual bus pass registration, boarding points, and safety tracking.',
    sections: [
      {
        id: 'sec-trans-1',
        title: 'Bus Pass Application & RFID Scanning',
        content: `College bus transport is available on 32 pre-designated city routes. Students must register for the Annual Transport Pass during July. Boarding requires RFID pass verification. Morning buses arrive at campus by 08:15 AM; evening return buses depart promptly at 04:30 PM.`
      }
    ]
  },
  {
    id: 'doc-017',
    code: 'GRIEV-POL-2025',
    title: 'Student Grievance Redressal Committee Regulations',
    category: 'Student Policy',
    lastUpdated: '2025-08-03',
    chunksCount: 12,
    status: 'Indexed',
    version: 'v2.0',
    fileType: 'PDF',
    summary: 'Procedures for lodging complaints regarding academic evaluation, discrimination, hostel amenities, and administrative services.',
    sections: [
      {
        id: 'sec-griev-1',
        title: 'Filing Appeals & Resolution Timeline',
        content: `Students with grievances regarding evaluation, fee discrepancy, or harassment may file an online petition via the Grievance Portal. The Student Grievance Redressal Cell is mandated by AICTE/UGC to resolve matters within 15 working days.`
      }
    ]
  },
  {
    id: 'doc-018',
    code: 'ICC-POL-2025',
    title: 'Internal Complaints Committee (ICC) & Gender Equity Policy',
    category: 'Student Policy',
    lastUpdated: '2025-06-25',
    chunksCount: 16,
    status: 'Indexed',
    version: 'v2.1',
    fileType: 'PDF',
    summary: 'Guidelines for prevention of sexual harassment (PoSH Act), confidential complaint mechanism, and investigation protocols.',
    sections: [
      {
        id: 'sec-icc-1',
        title: 'PoSH Compliance & Immediate Support',
        content: `The institution maintains strict compliance with the PoSH Act 2013 through the Internal Complaints Committee (ICC). Complaints can be submitted in confidence to icc@college.edu or via the physical drop box at the Administrative Block.`
      }
    ]
  },
  {
    id: 'doc-019',
    code: 'FEST-GUIDE-2025',
    title: 'Annual Technical Symposium & Cultural Fest Guidelines',
    category: 'General',
    lastUpdated: '2025-08-20',
    chunksCount: 18,
    status: 'Indexed',
    version: 'v1.1',
    fileType: 'PDF',
    summary: 'Budget approvals, guest artist vetting, inter-college invitations, event volunteer OD attendance, and campus safety rules during fests.',
    sections: [
      {
        id: 'sec-fest-1',
        title: 'Student Volunteer OD & Fest Timings',
        content: `The national tech-cultural fest 'Innovanza' is held annually in March. Student organizing committee members are granted up to 5 days of On-Duty (OD) attendance. Outdoor musical concerts terminate strictly at 09:30 PM per local police guidelines.`
      }
    ]
  },
  {
    id: 'doc-020',
    code: 'IT-LAB-2025',
    title: 'Computing Center & Cloud Computing Lab Usage Policy',
    category: 'Academic',
    lastUpdated: '2025-07-30',
    chunksCount: 15,
    status: 'Indexed',
    version: 'v2.0',
    fileType: 'PDF',
    summary: 'High-performance computing (HPC) clusters, AWS/GCP student credits, GPU cluster reservations for deep learning projects.',
    sections: [
      {
        id: 'sec-it-1',
        title: 'HPC & GPU Server Reservations',
        content: `Final year project teams working on machine learning, generative AI, and computer vision can book access to the NVIDIA A100 GPU cluster through the Central Computing Portal. Maximum continuous run time is capped at 48 hours per reservation.`
      }
    ]
  },
  {
    id: 'doc-021',
    code: 'ALUM-MENTOR-2025',
    title: 'Alumni Association Mentorship & Career Guidance Program',
    category: 'Placement',
    lastUpdated: '2025-08-14',
    chunksCount: 13,
    status: 'Indexed',
    version: 'v1.0',
    fileType: 'PDF',
    summary: 'Connecting pre-final and final year students with alumni leaders in FAANG, top consultancies, and higher education abroad.',
    sections: [
      {
        id: 'sec-alum-1',
        title: 'Mentorship Allotment & Mock Interviews',
        content: `Pre-final students are paired with alumni mentors in their respective branch domains. Mentors conduct 1-on-1 resume reviews, mock system design rounds, and offer referrals for summer internships.`
      }
    ]
  },
  {
    id: 'doc-022',
    code: 'CAFETERIA-2025',
    title: 'Campus Cafeteria & Food Hygiene Regulations',
    category: 'General',
    lastUpdated: '2025-07-05',
    chunksCount: 11,
    status: 'Indexed',
    version: 'v1.3',
    fileType: 'PDF',
    summary: 'FSSAI certified food outlets, subsidized meal rates, multi-cuisine food court timings (08:00 AM - 08:00 PM), and digital cashless payments.',
    sections: [
      {
        id: 'sec-cafe-1',
        title: 'Operating Timings & Food Quality Audits',
        content: `The central food court operates from 08:00 AM to 08:00 PM. A surprise bi-weekly food safety audit is performed by the Campus Health Committee. All vendor payments are 100% digital via UPI/campus smart card.`
      }
    ]
  },
  {
    id: 'doc-023',
    code: 'ENV-GREEN-2025',
    title: 'Green Campus & Single-Use Plastic Prohibition Policy',
    category: 'General',
    lastUpdated: '2025-06-15',
    chunksCount: 10,
    status: 'Indexed',
    version: 'v1.5',
    fileType: 'PDF',
    summary: 'Zero single-use plastic policy, bicycle rental stands, rainwater harvesting, solar energy generation, and e-waste disposal bins.',
    sections: [
      {
        id: 'sec-env-1',
        title: 'Plastic Ban & Eco-Friendly Campus Rules',
        content: `The college is a certified Green Eco-Campus. Single-use plastic bottles, styrofoam cups, and non-biodegradable wrappers are prohibited. Bring-your-own-cup is mandatory at beverage kiosks. Free campus bicycles are stationed at all main gates.`
      }
    ]
  },
  {
    id: 'doc-024',
    code: 'MOOC-CREDIT-2025',
    title: 'NPTEL & SWAYAM Online Course Credit Transfer Policy',
    category: 'Academic',
    lastUpdated: '2025-08-08',
    chunksCount: 17,
    status: 'Indexed',
    version: 'v2.3',
    fileType: 'PDF',
    summary: 'Credit waiver of up to 12 credits through certified 8-week or 12-week NPTEL/SWAYAM/Coursera online courses.',
    sections: [
      {
        id: 'sec-mooc-1',
        title: 'Credit Equivalence & Proctored Exam Verification',
        content: `Students may earn up to 12 academic credits via approved NPTEL/SWAYAM courses in place of open electives. The student must pass the in-person proctored certification examination with at least an 'Elite' or 60% mark to claim credit transfer.`
      }
    ]
  },
  {
    id: 'doc-025',
    code: 'FIRST-AID-2025',
    title: 'Emergency Medical Care & Student Health Insurance',
    category: 'Student Policy',
    lastUpdated: '2025-07-01',
    chunksCount: 13,
    status: 'Indexed',
    version: 'v2.0',
    fileType: 'PDF',
    summary: 'Cashless group medical insurance coverage up to ₹1,50,000 for all enrolled students, tie-up hospitals, and emergency hotline.',
    sections: [
      {
        id: 'sec-aid-1',
        title: 'Student Insurance Coverage & Cashless Hospitalization',
        content: `Every enrolled student is covered under the Institutional Group Mediclaim Insurance policy with coverage up to ₹1,50,000 per academic year for accidental injury or inpatient hospitalization. The insurance card is linked to the student ID number.`
      }
    ]
  }
];

export const DEMO_QUESTIONS = [
  "What are the attendance requirements?",
  "When are the semester examinations?",
  "What are the leave rules?",
  "What placement opportunities are available?",
  "What are the academic regulations?",
  "What documents are available in the knowledge base?",
  "What is the student code of conduct?"
];
