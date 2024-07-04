
# Documentation
- Class name: LoadPromptsFromDir __Inspire
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI_smZNodes

LoadPromptsFromDir节点旨在从指定目录加载提示数据。它会扫描目录中的文本文件，提取符合预定义格式的提示，并将其组织成结构化格式以供进一步处理。这个节点简化了检索和组织提示数据的过程，使其在Inspire生态系统中的创意或分析应用中随时可用。

# Input types
## Required
- prompt_dir
    - 指定从中加载提示的目录路径。该路径用于定位和读取包含提示数据的文本文件，通过确定要处理的提示的来源，在节点的操作中起着至关重要的作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- zipped_prompt
    - 返回一个元组列表，每个元组包含一个提示的正面和负面部分，以及提取该提示的文件名。这种结构化输出便于后续节点或进程轻松访问和操作加载的提示数据。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: List[Tuple[str, str, str]]


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
