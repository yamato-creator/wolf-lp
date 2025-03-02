# GitHub Pages Setup Guide for wolfofwallstreet.co.jp

Follow these steps to complete the setup of your custom domain with GitHub Pages:

## 1. Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: https://github.com/yamato-creator/wolf-lp
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
5. Under "Custom domain":
   - Enter: `wolfofwallstreet.co.jp`
   - Check "Enforce HTTPS" (recommended for security)
6. Click "Save"

## 2. DNS Configuration at お名前.com

You need to configure your DNS settings at お名前.com to point to GitHub Pages:

1. Log in to your お名前.com account
2. Go to the DNS settings for wolfofwallstreet.co.jp
3. Add the following DNS records:

### Option 1: Apex Domain (Recommended)
Add these A records pointing to GitHub Pages' IP addresses:
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

### Option 2: With www subdomain
If you also want www.wolfofwallstreet.co.jp to work:
```
CNAME    www    yamato-creator.github.io.
```

## 3. Verify Deployment

1. After pushing changes to your main branch, GitHub Actions will automatically build and deploy your site
2. Check the "Actions" tab in your GitHub repository to monitor the deployment progress
3. Once deployed, your site should be accessible at https://wolfofwallstreet.co.jp

## Troubleshooting

- DNS changes may take up to 24-48 hours to propagate globally
- If you see a 404 error, check that your GitHub Pages settings are correct
- Verify that your CNAME file contains only `wolfofwallstreet.co.jp` and no other text or whitespace

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) 