
# Documentation
- Class name: DependenciesEdit
- Category: Art Venture/Utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DependenciesEdit 节点旨在修改和更新艺术生成过程所需的依赖项。它允许根据提供的输入来自定义各种组件，如 VAE 模型、检查点、CLIP 模型等。通过调整底层依赖项，该节点在根据特定需求定制艺术生成管道方面发挥着关键作用。

# Input types
## Required
- dependencies
    - 包含当前依赖项集的元组，此节点将根据其他输入参数对其进行修改。它是决定任何修改起点的核心输入。
    - Comfy dtype: DEPENDENCIES
    - Python dtype: Tuple

## Optional
- ckpt_name
    - 确定模型的检查点名称，可从可用检查点中选择或指定自定义检查点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_name
    - 指定要使用的 VAE 模型的名称，允许从预定义选项或自定义模型中进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip
    - 定义要使用的 CLIP 模型，在选择适合任务的模型方面提供灵活性。
    - Comfy dtype: CLIP
    - Python dtype: Optional[str]
- clip_skip
    - 设置要在 CLIP 模型中跳过的层数，根据需要优化性能或准确性。
    - Comfy dtype: INT
    - Python dtype: int
- positive
    - 用于影响生成过程的正面提示，增强创意输出。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 用于引导生成远离不期望方向的负面提示，优化结果。
    - Comfy dtype: STRING
    - Python dtype: str
- lora_stack
    - 指定要应用的 LoRA 堆栈，允许进行高级模型适应和微调。
    - Comfy dtype: LORA_STACK
    - Python dtype: Optional[Tuple]
- cnet_stack
    - 确定要使用的 ControlNet 堆栈，实现对生成过程的精确控制。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: Optional[Tuple]

# Output types
- dependencies
    - 反映根据输入参数进行更新后的修改后的依赖项集。
    - Comfy dtype: DEPENDENCIES
    - Python dtype: Tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilDependenciesEdit:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dependencies": ("DEPENDENCIES",),
            },
            "optional": {
                "ckpt_name": (
                    [
                        "Original",
                    ]
                    + folder_paths.get_filename_list("checkpoints"),
                ),
                "vae_name": (["Original", "Baked VAE"] + folder_paths.get_filename_list("vae"),),
                "clip": ("CLIP",),
                "clip_skip": (
                    "INT",
                    {"default": 0, "min": -24, "max": 0, "step": 1},
                ),
                "positive": ("STRING", {"default": "Original", "multiline": True}),
                "negative": ("STRING", {"default": "Original", "multiline": True}),
                "lora_stack": ("LORA_STACK",),
                "cnet_stack": ("CONTROL_NET_STACK",),
            },
        }

    RETURN_TYPES = ("DEPENDENCIES",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "edit_dependencies"

    def edit_dependencies(
        self,
        dependencies: Tuple,
        vae_name="Original",
        ckpt_name="Original",
        clip=None,
        clip_skip=0,
        positive="Original",
        negative="Original",
        lora_stack=None,
        cnet_stack=None,
    ):
        (
            _vae_name,
            _ckpt_name,
            _clip,
            _clip_skip,
            _positive_prompt,
            _negative_prompt,
            _lora_stack,
            _cnet_stack,
        ) = dependencies

        if vae_name != "Original":
            _vae_name = vae_name
        if ckpt_name != "Original":
            _ckpt_name = ckpt_name
        if clip is not None:
            _clip = clip
        if clip_skip < 0:
            _clip_skip = clip_skip
        if positive != "Original":
            _positive_prompt = positive
        if negative != "Original":
            _negative_prompt = negative
        if lora_stack is not None:
            _lora_stack = lora_stack
        if cnet_stack is not None:
            _cnet_stack = cnet_stack

        dependencies = (
            _vae_name,
            _ckpt_name,
            _clip,
            _clip_skip,
            _positive_prompt,
            _negative_prompt,
            _lora_stack,
            _cnet_stack,
        )

        print("Dependencies:", dependencies)

        return (dependencies,)

```
