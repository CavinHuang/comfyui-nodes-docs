---
tags:
- Prompt
---

# Load Prompts From Dir (Inspire)
## Documentation
- Class name: `LoadPromptsFromDir __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The LoadPromptsFromDir node is designed to facilitate the loading of prompt data from a specified directory. It scans the directory for text files, extracts prompts that match a predefined format, and organizes them into a structured format for further processing. This node streamlines the process of retrieving and structuring prompt data, making it readily accessible for creative or analytical applications within the Inspire ecosystem.
## Input types
### Required
- **`prompt_dir`**
    - Specifies the directory path from which to load the prompts. This path is used to locate and read the text files containing prompt data, playing a crucial role in the node's operation by determining the source of the prompts to be processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`zipped_prompt`**
    - Comfy dtype: `ZIPPED_PROMPT`
    - Returns a list of tuples, each containing the positive and negative parts of a prompt along with the file name from which it was extracted. This structured output facilitates easy access and manipulation of the loaded prompt data for subsequent nodes or processes.
    - Python dtype: `List[Tuple[str, str, str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadPromptsFromDir:
    @classmethod
    def INPUT_TYPES(cls):
        global prompts_path
        try:
            prompt_dirs = [d for d in os.listdir(prompts_path) if os.path.isdir(os.path.join(prompts_path, d))]
        except Exception:
            prompt_dirs = []

        return {"required": {"prompt_dir": (prompt_dirs,)}}

    RETURN_TYPES = ("ZIPPED_PROMPT",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, prompt_dir):
        global prompts_path
        prompt_dir = os.path.join(prompts_path, prompt_dir)
        files = [f for f in os.listdir(prompt_dir) if f.endswith(".txt")]
        files.sort()

        prompts = []
        for file_name in files:
            print(f"file_name: {file_name}")
            try:
                with open(os.path.join(prompt_dir, file_name), "r", encoding="utf-8") as file:
                    prompt_data = file.read()
                    prompt_list = re.split(r'\n\s*-+\s*\n', prompt_data)

                    for prompt in prompt_list:
                        pattern = r"positive:(.*?)(?:\n*|$)negative:(.*)"
                        matches = re.search(pattern, prompt, re.DOTALL)

                        if matches:
                            positive_text = matches.group(1).strip()
                            negative_text = matches.group(2).strip()
                            result_tuple = (positive_text, negative_text, file_name)
                            prompts.append(result_tuple)
                        else:
                            print(f"[WARN] LoadPromptsFromDir: invalid prompt format in '{file_name}'")
            except Exception as e:
                print(f"[ERROR] LoadPromptsFromDir: an error occurred while processing '{file_name}': {str(e)}")

        return (prompts, )

```
