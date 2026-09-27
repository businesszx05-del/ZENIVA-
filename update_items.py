import os
import requests
import json

TOKEN = os.getenv("GH_PAT")
OWNER = "businesszx05-del"

# App ke categories ke mutabiq keys aur repo names
REPOS = {
    "wallpapers": "Wallpapers-",
    "stickers": "Whatsapp-stickers-",
    "wishes": "Wish-card",
    "dps": "Profile-Dps"
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
                sub_category_name = item["name"]
                sub_contents = get_repo_contents(repo_name, item["path"])
                for sub_item in sub_contents:
                    if sub_item["type"] == "file" and sub_item["name"].lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                        all_items.append({
                            "category": category,
                            "subCategory": sub_category_name,
                            "title": sub_item["name"],
                            "url": sub_item["download_url"]
                        })
            elif item["type"] == "file" and item["name"].lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                all_items.append({
                            "category": category,
                            "subCategory": "General",
                            "title": item["name"],
                            "url": item["download_url"]
                })

    with open("items.json", "w") as f:
        json.dump(all_items, f, indent=4)
    print("items.json successfully updated with subCategories!")

if __name__ == "__main__":
    main()
