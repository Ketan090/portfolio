Add-Type -AssemblyName System.Net.Http
$content = Get-Content 'script.js' -Raw
$m = [regex]::Match($content, "SHEET_URL\s*=\s*'([^']+)'")
$url = $m.Groups[1].Value
Write-Host "URL=$url"
$body = '{"type":"photo","data":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgFGfh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AVN//2Q=="}'
$c = New-Object System.Net.Http.HttpClient
$c.Timeout = [TimeSpan]::FromSeconds(150)
$req = New-Object System.Net.Http.HttpRequestMessage([System.Net.Http.HttpMethod]::Post, $url)
$req.Headers.TryAddWithoutValidation('Content-Type','text/plain;charset=utf-8') | Out-Null
$req.Content = New-Object System.Net.Http.StringContent($body,[System.Text.Encoding]::UTF8,'text/plain')
$resp = $c.SendAsync($req).Result
Write-Host "STATUS=$([int]$resp.StatusCode)"
Write-Host "BODY=$($resp.Content.ReadAsStringAsync().Result)"