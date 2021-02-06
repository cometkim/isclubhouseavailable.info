import { annotate } from 'https://unpkg.com/rough-notation?module';
import { getAccurateAgent } from 'https://unpkg.com/@egjs/agent@2.2.1/dist/agent.esm.js';

const annoatationColor = 'rgb(255, 213, 79)';

const $clubhouse = document.getElementById('clubhouse');
const $platform = document.getElementById('platform');
const $platformValue = $platform.querySelector('.value');
const $answer = document.getElementById('answer');

const clubhouseAnnoatation = annotate(
  $clubhouse,
  { type: 'underline', color: annoatationColor }
);

function isAvailable(agent) {
  return /ios/i.test(agent.os.name);
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function getTemplateElement({ agent }) {
  return document.getElementById(
    isAvailable(agent) ? 'answer-yes' : 'answer-no'
  )
}

async function onDone({ agent }) {
  await delay(1000);

  document.body.classList.add('done');

  await delay(1000);

  annotate(
    $platformValue,
    {
      type: isAvailable(agent) ? 'circle' : 'crossed-off',
      color: annoatationColor,
    },
  ).show();

  const t = getTemplateElement({ agent });
  const answer = document.importNode(t.content, true);
  $answer.appendChild(answer);
}

(async function() {
  clubhouseAnnoatation.show();

  const agent = await getAccurateAgent();
  $platformValue.textContent = agent.os.name;

  onDone({ agent });
})();
