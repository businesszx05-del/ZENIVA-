import os
import requests
import json

# GitHub token aur owner details
TOKEN = os.getenv("GH_PAT")
OWNER = "businesszx05-del"  # Aapka GitHub username

# Repositories aur unki categories ki sahi mapping
REPOS = {
    "Wallpapers": "Wallpapers-",
    "Stickers": "Whatsapp-stickers-",
    "Wish Cards": "Wish-card",
    "DP": "Profile-Dps"  # Exact repo name screenshot ke mutabiq
}

HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "vnd.github.v3+json"
}

def get_repo_contents(repo_name, path=""):
    url = f"https://api.github.com/repos/{OWNER}/{repo_name}/contents/{path}"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    return []

def main():
    all_items = []

    for category, repo_name in REPOS.items():
        contents = get_repo_contents(repo_name)
        for item in contents:
            if item["type"] == "dir":
                # Agar folder hai toh uske andar ki images fetch karein
                sub_contents = get_repo_contents(repo_name, item["path"])
                for sub_item in sub_contents:
                    if sub_item["type"] == "file" and sub_item["name"].lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                        all_items.append({
                            "category": category,
                            "title": sub_item["name"],
                            "url": sub_item["download_url"]
                        })
            elif item["type"] == "file" and item["name"].lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                all_items.append({
                    "category": category,
                    "title": item["name"],
                    "url": item["download_url"]
                })

    # items.json file update karna
    with open("items.json", "w") as f:
        json.dump(all_items, f, indent=4)
    print("items.json successfully updated!")

if __name__ == "__main__":
    main()
