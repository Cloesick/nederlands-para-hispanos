"""Regenerates data/lessons/index.json from the lesson files. Run after adding/editing lessons."""
import json, io, os

ORDER = [
    "a1-01-conocerse", "a1-02-de-het",
]

here = os.path.dirname(os.path.abspath(__file__))
folder = os.path.join(here, "data", "lessons")
lessons = []
for lid in ORDER:
    path = os.path.join(folder, lid + ".json")
    if not os.path.exists(path):
        print(f"!! missing: {lid}")
        continue
    with io.open(path, encoding="utf-8") as f:
        L = json.load(f)
    lessons.append({
        "id": L["id"], "unit": L["unit"], "title": L["title"], "emoji": L["emoji"],
        "phrases": len(L.get("phrases", [])), "exercises": len(L.get("exercises", [])),
        "vocab": len(L.get("vocab", [])),
    })

out = {"lessons": lessons}
with io.open(os.path.join(folder, "index.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print(f"index.json: {len(lessons)} lessons")
