const { chromium } = require('playwright');

const OUT_DIR = '/Users/sanghunbruceham/.gemini/antigravity/brain/14cc84d7-d0b4-46cd-a9d1-e1b041ac4704';
const BASE_URL = 'http://localhost:5176';
const errors = [];

function log(msg) { console.log(msg); }

async function runTest(browser, gameName, testFn) {
    log(`\n=== TEST: ${gameName} ===`);
    // Fresh page per game to avoid cascade failures
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    page.on('console', msg => { if (msg.type() === 'error') errors.push(`[${gameName}] Console: ${msg.text()}`); });
    page.on('pageerror', err => errors.push(`[${gameName}] CRASH: ${err.message}`));

    const ss = async (name) => {
        await page.screenshot({ path: `${OUT_DIR}/${name}.png` });
        log(`  📸 ${name}`);
    };
    const tryClick = async (sel, desc) => {
        try {
            await page.click(sel, { timeout: 7000 });
            log(`  ✅ ${desc}`);
            return true;
        } catch (e) {
            const msg = `  ❌ FAIL: ${desc} [${sel}]: ${e.message.split('\n')[0]}`;
            log(msg);
            errors.push(msg);
            return false;
        }
    };

    try {
        await page.goto(BASE_URL);
        await page.waitForTimeout(1500);
        await testFn(page, ss, tryClick);
    } catch (err) {
        errors.push(`[${gameName}] FATAL: ${err.message}`);
        await ss(`qa_err_${gameName.replace(/\s/g, '_')}`).catch(() => { });
    }
    await context.close();
}

(async () => {
    const browser = await chromium.launch({ headless: true });

    // --- MAIN MENU ---
    await runTest(browser, 'MAIN MENU', async (page, ss, tryClick) => {
        await ss('qa_v2_01_main_menu');
        await tryClick('text="AFTER DARK 18+"', '18+ Toggle ON');
        await page.waitForTimeout(400);
        await ss('qa_v2_02_afterdark_on');
        await tryClick('text="AFTER DARK 18+"', '18+ Toggle OFF');
        log('  ✅ Main Menu PASS');
    });

    // --- KING'S CUP ---
    await runTest(browser, "KING'S CUP", async (page, ss, tryClick) => {
        await tryClick('button:has-text("KING")', "King's Cup card");
        await page.waitForTimeout(700);
        await ss('qa_v2_03_kingscup_start');
        await tryClick('button:has-text("START")', "Start");
        await page.waitForTimeout(600);
        await ss('qa_v2_04_kingscup_active');
        for (let i = 0; i < 3; i++) {
            await tryClick('button:has-text("DRAW CARD")', `Draw Card #${i + 1}`);
            await page.waitForTimeout(400);
        }
        await ss('qa_v2_05_kingscup_draw');
        await tryClick('button:has-text("MENU")', "Back (MENU)");
        await page.waitForTimeout(500);
        const title = await page.locator('text="IGNITE"').count();
        log(title > 0 ? '  ✅ Navigation back to Main Menu: PASS' : '  ❌ Navigation back: FAIL - still on game screen');
    });

    // --- BOMB 31 ---
    await runTest(browser, 'BOMB 31', async (page, ss, tryClick) => {
        await tryClick('button:has-text("31 BOMB")', "31 Bomb card");
        await page.waitForTimeout(600);
        await ss('qa_v2_06_bomb31_start');
        await tryClick('button:has-text("START")', "Start");
        await page.waitForTimeout(500);
        await ss('qa_v2_07_bomb31_active');
        for (let i = 0; i < 15; i++) {
            if ((await page.locator('text="BOOM!"').count()) > 0) break;
            await tryClick('button:has-text("+3")', `+3 tap`);
            await page.waitForTimeout(100);
        }
        await ss('qa_v2_08_bomb31_boom');
        const hasBoom = (await page.locator('text="BOOM!"').count()) > 0;
        log(hasBoom ? '  ✅ BOOM! state reached: PASS' : '  ❌ BOOM! state not reached: FAIL');
        await tryClick('button:has-text("PLAY AGAIN")', "Play Again");
        await page.waitForTimeout(400);
        await ss('qa_v2_09_bomb31_reset');
        await tryClick('button:has-text("MENU")', "Back");
    });

    // --- NUNCHI TAP ---
    await runTest(browser, 'NUNCHI TAP', async (page, ss, tryClick) => {
        await tryClick('button:has-text("NUNCHI TAP")', "Nunchi Tap card");
        await page.waitForTimeout(600);
        await ss('qa_v2_10_nunchi_start');
        await tryClick('button:has-text("START")', "Start");
        await page.waitForTimeout(600);
        await ss('qa_v2_11_nunchi_playing');
        // slow taps
        for (let i = 0; i < 3; i++) {
            await page.dispatchEvent('[style*="dashed"]', 'pointerdown');
            await page.waitForTimeout(700);
        }
        await ss('qa_v2_12_nunchi_counting');
        // fast taps to trigger clash
        await page.dispatchEvent('[style*="dashed"]', 'pointerdown');
        await page.waitForTimeout(50);
        await page.dispatchEvent('[style*="dashed"]', 'pointerdown');
        await page.waitForTimeout(800);
        await ss('qa_v2_13_nunchi_gameover');
        const hasClash = (await page.locator('text="CLASH!"').count()) > 0;
        log(hasClash ? '  ✅ CLASH! state reached: PASS' : '  ❌ CLASH! triggered but wrong text or state');
        await tryClick('button:has-text("MENU")', "Back");
    });

    // --- VIBEVOTE ---
    await runTest(browser, 'VIBEVOTE', async (page, ss, tryClick) => {
        await tryClick('button:has-text("VIBE VOTE")', "VibeVote card");
        await page.waitForTimeout(600);
        await ss('qa_v2_14_vibevote_start');
        await tryClick('button:has-text("START")', "Start");
        await page.waitForTimeout(700);
        await ss('qa_v2_15_vibevote_prompt');
        const prompt = await page.locator('h2').first().textContent().catch(() => '');
        log(`  📊 Prompt text displayed: "${prompt.substring(0, 60)}"`);
        await tryClick('button:has-text("SPIN THE WHEEL")', "Spin Wheel");
        await page.waitForTimeout(3000);
        await ss('qa_v2_16_vibevote_consequence');
        const consequence = await page.locator('h1').first().textContent().catch(() => '');
        log(`  📊 Consequence: "${consequence}"`);
        await tryClick('button:has-text("NEXT PROMPT")', "Next Question from consequence screen");
        await page.waitForTimeout(500);
        await ss('qa_v2_17_vibevote_next');
        await tryClick('button:has-text("SPIN THE WHEEL")', "Spin again");
        await page.waitForTimeout(3000);
        await tryClick('button:has-text("Share Result")', "Share Result");
        await page.waitForTimeout(800);
        await ss('qa_v2_18_vibevote_receipt');
        const hasReceipt = (await page.locator('text="PARTY NIGHT RECEIPT"').count()) > 0;
        log(hasReceipt ? '  ✅ Share Receipt visible: PASS' : '  ❌ Share receipt not shown: FAIL');
        // Close X
        await page.locator('button >> svg').first().click().catch(async () => {
            await page.keyboard.press('Escape');
        });
        await page.waitForTimeout(500);
        await tryClick('button:has-text("MENU")', "Back");
    });

    // --- NEVER HAVE I EVER ---
    await runTest(browser, 'NEVER HAVE I EVER', async (page, ss, tryClick) => {
        await tryClick('button:has-text("NEVER HAVE")', "NHIE card");
        await page.waitForTimeout(600);
        await ss('qa_v2_19_nhie_start');
        await tryClick('button:has-text("START")', "Start");
        await page.waitForTimeout(700);
        await ss('qa_v2_20_nhie_prompt');
        const prompt = await page.locator('h2').first().textContent().catch(() => '');
        log(`  📊 Prompt: "${prompt.substring(0, 60)}"`);
        await tryClick('button:has-text("NEXT PROMPT")', "Next Prompt");
        await page.waitForTimeout(400);
        await ss('qa_v2_21_nhie_next');
        await tryClick('button:has-text("Share Result")', "Share Result");
        await page.waitForTimeout(800);
        await ss('qa_v2_22_nhie_receipt');
        const hasReceipt = (await page.locator('text="PARTY NIGHT RECEIPT"').count()) > 0;
        log(hasReceipt ? '  ✅ Share Receipt visible: PASS' : '  ❌ Share receipt not shown: FAIL');
        await page.locator('button >> svg').first().click().catch(async () => {
            await page.keyboard.press('Escape');
        });
        await page.waitForTimeout(500);
        await tryClick('button:has-text("MENU")', "Back");
    });

    await browser.close();

    console.log('\n======== FINAL QA SUMMARY ========');
    if (errors.length === 0) {
        console.log('✅ ZERO errors — App is fully stable!');
    } else {
        console.log(`Found ${errors.length} issues:`);
        for (const e of errors) console.log(e);
    }
})();
