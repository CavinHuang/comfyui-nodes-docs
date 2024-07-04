
# Documentation
- Class name: IF_SaveText
- Category: ImpactFrames💥🎞️
- Output node: True
- Repo Ref: https://github.com/chrisgoringe/Custom-classifier-nodes/tree/main

IF_SaveText节点旨在处理并可选择性保存与交互相关的文本数据，如问题、回答和负面反馈，并支持多种文件格式。该节点的功能包括为每次交互生成唯一标识符、格式化交互数据，以及以指定格式和模式将数据保存到文件中，从而增强数据管理和检索能力，便于进一步分析或记录保存。

# Input types
## Required
- question_input
    - 交互中的问题部分，作为生成交互记录的关键输入。
    - Comfy dtype: STRING
    - Python dtype: str
- response_input
    - 对问题的回答，对记录交互至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_input
    - 与交互相关的负面反馈或输入，提供额外的上下文信息。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- save_file
    - 布尔标志，指示是否将交互数据保存到文件中。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- file_format
    - 指定保存交互数据的文件格式（csv、txt、json）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_mode
    - 决定文件的保存方式：创建新文件、覆盖现有文件或追加到现有文件。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- Question
    - Comfy dtype: STRING
    - 返回交互中的问题部分。
    - Python dtype: str
- Response
    - Comfy dtype: STRING
    - 返回交互中的回答部分。
    - Python dtype: str
- Negative
    - Comfy dtype: STRING
    - 返回与交互相关的负面反馈或输入。
    - Python dtype: str
- Turn
    - Comfy dtype: STRING
    - 返回一个格式化的字符串，包含交互的唯一标识符、问题、回答和负面输入。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFSaveText:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "question_input": ("STRING", {"forceInput": True}),
                "response_input": ("STRING", {"forceInput": True}),
                "negative_input": ("STRING", {"forceInput": True}),
                #"turn": ("STRING", {"forceInput": True}),
            },
            "optional": {                
                "save_file": ("BOOLEAN", {"default": False, "label_on": "Save Text", "label_off": "Don't Save"}),
                "file_format": (["csv", "txt", "json"],),
                "save_mode": (["create", "overwrite", "append"],),
            },
            #"hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING",)
    RETURN_NAMES = ("Question", "Response", "Negative", "Turn",)
    FUNCTION = "process_text"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"

    def process_text(self, question_input, negative_input, response_input, save_file=False, file_format="txt", save_mode="create"):
        turn_id = str(uuid.uuid4()) 
        turn_data = {"id": turn_id, "question": question_input, "response": response_input, "negative": negative_input}
        if save_file:
            self.save_text_to_file(turn_data, file_format, save_mode)

        turn = f"ID: {turn_id}\nQuestion: {question_input}\nResponse: {response_input}\nNegative: {negative_input}"
        return (question_input, response_input, negative_input, turn)

    def save_text_to_file(self, turn_data, file_format, save_mode):
        save_text_dir = folder_paths.get_output_directory()
        os.makedirs(save_text_dir, exist_ok=True)
        file_path = os.path.join(save_text_dir, f"output.{file_format}")

        file_mode = "w" if save_mode in ["create", "overwrite"] else "a"

        if file_format == "csv":
            with open(file_path, file_mode, newline='') as csvfile:
                fieldnames = ['question', 'response']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                if save_mode == "create" or save_mode == "overwrite":
                    writer.writeheader()
                writer.writerow(turn_data)

        elif file_format == "txt":
            with open(file_path, file_mode) as txtfile:
                txtfile.write(f"{turn_data}\n")

        elif file_format == "json":
            with open(file_path, file_mode) as jsonfile:
                if save_mode == "append":
                    try:
                        data = json.load(jsonfile)
                    except:
                        data = []
                    data.append(turn_data)
                    jsonfile.seek(0)
                else:
                    data = [turn_data]
                json.dump(data, jsonfile, indent=4)

    """@classmethod
    def IS_CHANGED(cls, turn_id, question_input, negative_input, response_input, turn, save_file, file_format, save_mode, unique_id=None, prompt=None, extra_pnginfo=None):
        turn = f"ID: {turn_id}\nQuestion: {question_input}\nResponse: {response_input}\nNegative: {negative_input}"
        return {"ui": {"string": [turn]}, "result": (turn,)}"""

```
