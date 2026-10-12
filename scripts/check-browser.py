import json
import os
import sys
from playwright.sync_api import sync_playwright
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 context=browser.new_context(viewport={'width':1440,'height':1000},permissions=['clipboard-read','clipboard-write'])
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for route in ['/docs/engine','/docs/tutorials/first-game','/docs/api/audio/stop-recording','/docs/open-source/examples','/docs/reference/compatibility']:
  page.goto(base+route);page.wait_for_load_state('networkidle');page.wait_for_timeout(250)
  assert page.locator('main h1').count()==1,route
  assert page.locator('.version-button').inner_text()=='Docs v0.1'
  assert page.locator('a[aria-current="page"]').count()>=1
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),route
  results.append('Desktop page: '+route)
 page.goto(base+'/docs/api/audio#supported-audio-files');page.wait_for_load_state('networkidle')
 assert page.locator('#supported-audio-files').count()==1
 results.append('Restored audio category deep link')
 page.goto(base+'/docs/tutorials/first-game');page.wait_for_load_state('networkidle')
 page.get_by_role('button',name='Copy lua code').click()
 assert 'FixedUpdate' in page.evaluate('navigator.clipboard.readText()')
 results.append('Code copying')
 page.goto(base+'/docs/search');page.wait_for_load_state('networkidle')
 field=page.get_by_role('textbox');field.fill('Audio.stop');page.wait_for_timeout(200)
 assert page.locator('.result-title').filter(has_text='Audio').count()>0
 page.get_by_role('button',name='API',exact=True).click()
 assert page.locator('.search-index-list a').count()>0
 assert all('/docs/api/' in href for href in page.locator('.search-index-list a').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))'))
 results.append('Qualified API search and type filter')
 field.fill('');page.get_by_role('button',name='Tutorial',exact=True).click()
 assert page.get_by_text('Your first playable scene',exact=True).count()>0
 results.append('Tutorial search filter')
 page.goto(base+'/docs/tutorials/first-game');page.wait_for_load_state('networkidle')
 page.keyboard.press('Tab');assert page.locator(':focus').inner_text()=='Skip to content'
 page.keyboard.press('Enter');assert page.locator(':focus').get_attribute('id')=='main-content'
 results.append('Keyboard skip link')
 page.screenshot(path='/tmp/rustic-docs-desktop.png',full_page=False)
 page.set_viewport_size({'width':390,'height':844});page.goto(base+'/docs/tutorials/first-game');page.wait_for_load_state('networkidle')
 assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
 page.get_by_role('button',name='Open navigation').click()
 assert page.get_by_role('button',name='Close navigation',exact=True).first.evaluate('(e)=>e===document.activeElement')
 assert page.locator('#docs-sidebar').evaluate('(e)=>getComputedStyle(e).visibility')=='visible'
 for _ in range(20):
  page.keyboard.press('Tab')
  assert page.locator(':focus').evaluate('(e)=>!!e.closest("#docs-sidebar")')
 page.keyboard.press('Escape')
 assert page.get_by_role('button',name='Open navigation').evaluate('(e)=>e===document.activeElement')
 assert page.locator('#docs-sidebar').evaluate('(e)=>getComputedStyle(e).visibility')=='hidden'
 results.append('Mobile focus trap, Escape, focus restoration and hidden menu')
 page.screenshot(path='/tmp/rustic-docs-mobile.png',full_page=False)
 page.get_by_role('button',name='Toggle theme').click()
 assert page.locator('.site.dark').count()==1
 results.append('Theme toggle')
 for route in ['/docs/api/audio/stop-recording', '/docs/reference/compatibility', '/docs/open-source']:
  page.goto(base+route);page.wait_for_load_state('networkidle')
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),route
 results.append('Mobile API, compatibility table and repository directory have no page overflow')
 assert not errors,errors
 print(json.dumps({'passed':results,'page_errors':errors},indent=2))
 browser.close()
