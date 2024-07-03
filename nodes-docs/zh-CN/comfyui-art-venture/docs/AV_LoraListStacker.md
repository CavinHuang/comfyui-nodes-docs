
# Documentation
- Class name: AV_LoraListStacker
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_LoraListStacker节点旨在管理和堆叠Lora模型的配置，促进多个Lora模型动态集成并应用到处理流程中。它抽象了处理Lora模型参数的复杂性，确保模型的应用顺序尊重预期的分层和强度调整。

# Input types
## Required
- data
    - 'data'输入包含了JSON格式的Lora模型列表及其配置，规定了每个Lora模型应如何应用于基础模型。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- base_url
    - 'base_url'可选输入提供了一个默认的URL前缀，用于获取本地不可用的Lora模型，便于远程模型检索。
    - Comfy dtype: STRING
    - Python dtype: str
- lora_stack
    - 'lora_stack'输入允许包含现有的Lora模型堆栈，以进行进一步处理或与新的Lora配置集成。
    - Comfy dtype: LORA_STACK
    - Python dtype: list

# Output types
- lora_stack
    - 返回整合了指定Lora模型调整后的更新后的Lora模型堆栈。
    - Comfy dtype: LORA_STACK
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVLoraListStacker:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "data": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
            },
            "optional": {"base_url": ("STRING", {"default": lora_cloud_front_url}), "lora_stack": ("LORA_STACK",)},
        }

    RETURN_TYPES = ("LORA_STACK",)
    FUNCTION = "load_list_lora"
    CATEGORY = "Art Venture/Loaders"

    def parse_lora_list(self, data: str, base_url: str):
        # data is a list of lora model (lora_name, strength_model, strength_clip, url) in json format
        # trim data
        data = data.strip()
        if data == "" or data == "[]" or data is None:
            return []

        print(f"Loading lora list: {data}")

        lora_list = json.loads(data)
        if len(lora_list) == 0:
            return []

        available_loras = folder_paths.get_filename_list("loras")
        model_path = os.path.join(folder_paths.models_dir, "loras")

        lora_params = []
        for lora in lora_list:
            lora_name = lora["name"]
            strength_model = lora["strength"]
            strength_clip = lora["strength"]
            lora_url = lora.get("url", None)

            if strength_model == 0 and strength_clip == 0:
                continue

            if lora_name not in available_loras:
                lora_url = lora_url or f"{base_url}/models/loras/{lora_name}"
                load_file_from_url(lora_url, model_dir=model_path, file_name=lora_name)

            lora_params.append((lora_name, strength_model, strength_clip))

        return lora_params

    def load_list_lora(self, data, base_url=lora_cloud_front_url, lora_stack=None):
        loras = self.parse_lora_list(data, base_url=base_url)

        if lora_stack is not None:
            loras.extend([l for l in lora_stack if l[0] != "None"])

        return (loras,)

```
