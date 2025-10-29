import { AssessmentItem } from '@/types/assessment';

export const assessmentItems: AssessmentItem[] = [
  // Visual Items (V01-V10)
  {
    id: 'V01',
    text: 'I understand concepts better when I can see them in a diagram or chart.',
    modality: 'Visual',
    polarity: '+'
  },
  {
    id: 'V02',
    text: 'When learning something new, I often draw pictures or diagrams to help me grasp it.',
    modality: 'Visual',
    polarity: '+'
  },
  {
    id: 'V03',
    text: 'I prefer textbooks that have lots of graphs, charts, and illustrations.',
    modality: 'Visual',
    polarity: '+'
  },
  {
    id: 'V04',
    text: 'Color-coding my notes or materials helps me organize and remember information.',
    modality: 'Visual',
    polarity: '+'
  },
  {
    id: 'V05',
    text: 'I can picture things in my mind clearly when someone describes them.',
    modality: 'Visual',
    polarity: '+'
  },
  {
    id: 'V06',
    text: 'I rarely use diagrams or visual aids when studying—they don\'t help me much.',
    modality: 'Visual',
    polarity: '-'
  },
  {
    id: 'V07',
    text: 'Mind maps and concept maps feel confusing rather than helpful to me.',
    modality: 'Visual',
    polarity: '-'
  },
  {
    id: 'V08',
    text: 'I don\'t pay much attention to charts or graphs in textbooks—I focus on the text.',
    modality: 'Visual',
    polarity: '-'
  },
  {
    id: 'V09',
    text: 'When trying to remember something, I rarely visualize it in my head.',
    modality: 'Visual',
    polarity: '-'
  },
  {
    id: 'V10',
    text: 'I find spatial arrangements like timelines or flowcharts unhelpful for learning.',
    modality: 'Visual',
    polarity: '-'
  },

  // Aural Items (A01-A10)
  {
    id: 'A01',
    text: 'I learn best when someone explains things to me verbally rather than in writing.',
    modality: 'Aural',
    polarity: '+'
  },
  {
    id: 'A02',
    text: 'I often repeat information out loud to help me remember it.',
    modality: 'Aural',
    polarity: '+'
  },
  {
    id: 'A03',
    text: 'I prefer listening to podcasts or lectures over reading articles on the same topic.',
    modality: 'Aural',
    polarity: '+'
  },
  {
    id: 'A04',
    text: 'Explaining concepts aloud to myself or others helps me understand them better.',
    modality: 'Aural',
    polarity: '+'
  },
  {
    id: 'A05',
    text: 'I find group discussions and study sessions particularly valuable for learning.',
    modality: 'Aural',
    polarity: '+'
  },
  {
    id: 'A06',
    text: 'I rarely benefit from listening to lectures—I prefer reading the material myself.',
    modality: 'Aural',
    polarity: '-'
  },
  {
    id: 'A07',
    text: 'Talking through problems out loud doesn\'t help me much—I prefer thinking silently.',
    modality: 'Aural',
    polarity: '-'
  },
  {
    id: 'A08',
    text: 'I find audiobooks or recorded lectures harder to focus on than written texts.',
    modality: 'Aural',
    polarity: '-'
  },
  {
    id: 'A09',
    text: 'I don\'t usually discuss what I\'m learning with others—it feels unnecessary.',
    modality: 'Aural',
    polarity: '-'
  },
  {
    id: 'A10',
    text: 'I prefer background silence when studying—any sound distracts me.',
    modality: 'Aural',
    polarity: '-'
  },

  // Read/Write Items (R01-R10)
  {
    id: 'R01',
    text: 'I take detailed, organized written notes during lectures or while reading.',
    modality: 'ReadWrite',
    polarity: '+'
  },
  {
    id: 'R02',
    text: 'The best way for me to learn something is to read about it thoroughly.',
    modality: 'ReadWrite',
    polarity: '+'
  },
  {
    id: 'R03',
    text: 'I prefer written instructions over verbal explanations or demonstrations.',
    modality: 'ReadWrite',
    polarity: '+'
  },
  {
    id: 'R04',
    text: 'Writing summaries or outlines helps me consolidate what I\'ve learned.',
    modality: 'ReadWrite',
    polarity: '+'
  },
  {
    id: 'R05',
    text: 'I check my understanding by writing out explanations in my own words.',
    modality: 'ReadWrite',
    polarity: '+'
  },
  {
    id: 'R06',
    text: 'I rarely take notes—I remember things fine without writing them down.',
    modality: 'ReadWrite',
    polarity: '-'
  },
  {
    id: 'R07',
    text: 'Reading long texts feels tedious to me—I\'d rather learn through other methods.',
    modality: 'ReadWrite',
    polarity: '-'
  },
  {
    id: 'R08',
    text: 'I don\'t usually write practice questions or summaries when studying.',
    modality: 'ReadWrite',
    polarity: '-'
  },
  {
    id: 'R09',
    text: 'Lists, bullet points, and written outlines don\'t help me organize information.',
    modality: 'ReadWrite',
    polarity: '-'
  },
  {
    id: 'R10',
    text: 'I prefer getting information from videos or demonstrations rather than articles.',
    modality: 'ReadWrite',
    polarity: '-'
  },

  // Kinesthetic Items (K01-K10)
  {
    id: 'K01',
    text: 'I learn best when I can practice doing something hands-on rather than just reading about it.',
    modality: 'Kinesthetic',
    polarity: '+'
  },
  {
    id: 'K02',
    text: 'Real-world examples and case studies help me understand abstract concepts.',
    modality: 'Kinesthetic',
    polarity: '+'
  },
  {
    id: 'K03',
    text: 'I find it hard to sit still for long periods while studying—I need movement breaks.',
    modality: 'Kinesthetic',
    polarity: '+'
  },
  {
    id: 'K04',
    text: 'I understand processes better when I can physically demonstrate or simulate them.',
    modality: 'Kinesthetic',
    polarity: '+'
  },
  {
    id: 'K05',
    text: 'I prefer learning through experiments, simulations, or practical activities.',
    modality: 'Kinesthetic',
    polarity: '+'
  },
  {
    id: 'K06',
    text: 'I can learn just fine from theory without needing practical examples.',
    modality: 'Kinesthetic',
    polarity: '-'
  },
  {
    id: 'K07',
    text: 'Hands-on activities feel like distractions—I learn better from lectures or reading.',
    modality: 'Kinesthetic',
    polarity: '-'
  },
  {
    id: 'K08',
    text: 'I rarely connect what I\'m learning to real-world applications—theory is enough.',
    modality: 'Kinesthetic',
    polarity: '-'
  },
  {
    id: 'K09',
    text: 'I can study effectively in one position for hours without needing to move.',
    modality: 'Kinesthetic',
    polarity: '-'
  },
  {
    id: 'K10',
    text: 'Building models or doing physical demonstrations doesn\'t help me remember concepts.',
    modality: 'Kinesthetic',
    polarity: '-'
  },
];
