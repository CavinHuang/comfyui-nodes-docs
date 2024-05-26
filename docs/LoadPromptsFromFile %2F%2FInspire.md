# Documentation
- Class name: LoadPromptsFromFile
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

LoadPromptsFromFile节点旨在从一个指定目录中读取和解析提示文件。它从每个文件中提取正面和负面的文本段落，遵循预定义的格式，并将它们组织成元组。该节点在准备进一步处理的提示数据中扮演着关键角色，例如训练或评估生成模型。

# Input types
## Required
- prompt_file
    - 'prompt_file'参数是一个字符串，指定包含提示的文本文件的相对路径。它对节点的操作至关重要，因为它决定了要加载和处理的提示的来源。
    - Comfy dtype: "str"
    - Python dtype: str

# Output types
- ZIPPED_PROMPT
    - 'ZIPPED_PROMPT'输出是一个元组列表，每个元组包含从提示文件中提取的正面和负面文本段落，以及文件的名称。这个输出很重要，因为它提供了下游任务所需的结构化数据。
    - Comfy dtype: COMBO["str", "str", "str"]
    - Python dtype: Tuple[str, str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class LoadPromptsFromFile:

    @classmethod
    def INPUT_TYPES(cls):
        global prompts_path
        try:
            prompt_files = []
            for (root, dirs, files) in os.walk(prompts_path):
                for file in files:
                    if file.endswith('.txt'):
                        file_path = os.path.join(root, file)
                        rel_path = os.path.relpath(file_path, prompts_path)
                        prompt_files.append(rel_path)
        except Exception:
            prompt_files = []
        return {'required': {'prompt_file': (prompt_files,)}}
    RETURN_TYPES = ('ZIPPED_PROMPT',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, prompt_file):
        prompt_path = os.path.join(prompts_path, prompt_file)
        prompts = []
        try:
            with open(prompt_path, 'r', encoding='utf-8') as file:
                prompt_data = file.read()
                prompt_list = re.split('\\n\\s*-+\\s*\\n', prompt_data)
                pattern = 'positive:(.*?)(?:\\n*|$)negative:(.*)'
                for prompt in prompt_list:
                    matches = re.search(pattern, prompt, re.DOTALL)
                    if matches:
                        positive_text = matches.group(1).strip()
                        negative_text = matches.group(2).strip()
                        result_tuple = (positive_text, negative_text, prompt_file)
                        prompts.append(result_tuple)
                    else:
                        print(f"[WARN] LoadPromptsFromFile: invalid prompt format in '{prompt_file}'")
        except Exception as e:
            print(f"[ERROR] LoadPromptsFromFile: an error occurred while processing '{prompt_file}': {str(e)}")
        return (prompts,)
```