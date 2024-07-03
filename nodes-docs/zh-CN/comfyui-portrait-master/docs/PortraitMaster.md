
# Documentation
- Class name: PortraitMaster
- Category: AI WizArt
- Output node: False

PortraitMaster节点旨在通过人工智能技术增强人像摄影效果，提供诸如改善照片真实感、自定义面部特征和调整风格等功能。它允许用户通过一系列输入参数微调人像图像的各个方面，如面部表情、皮肤质地和整体照片质量，从而影响增强型人像提示的生成。

# Input types
## Required
- shot
    - 选择拍摄方式，影响最终生成的人像构图和角度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- shot_weight
    - 调整所选拍摄方式的权重，影响该特定拍摄风格在最终结果中的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gender
    - 指定人像主体的性别，影响生成的人物特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- androgynous
    - 调整人像的中性特征程度，允许创建更多样化的性别表现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- age
    - 设定人像主体的年龄，影响生成的面部特征和整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- nationality_i
    - 选择人像主体的国籍或种族背景，影响面部特征和整体外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- nationality_mix
    - 调整多种国籍或种族特征的混合程度，用于创建更多样化的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- body_type
    - 选择人像主体的体型，影响整体身材和比例。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- body_type_weight
    - 调整所选体型特征的权重，影响体型在最终结果中的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- model_pose
    - 选择人像主体的姿势，影响整体构图和表现力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clothes
    - 选择人像主体的服装风格，影响整体外观和氛围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- eyes_color
    - 指定眼睛颜色，用于自定义人像主体的眼部特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- eyes_shape
    - 选择眼睛形状，进一步定制人像主体的眼部特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lips_color
    - 指定嘴唇颜色，用于自定义人像主体的唇部特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lips_shape
    - 选择嘴唇形状，进一步定制人像主体的唇部特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- facial_expression
    - 选择面部表情，影响人像的情感传达和整体氛围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- facial_expression_weight
    - 确定面部表情在人像中的权重，影响所选表情的强度和突出程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- face_shape
    - 从预定义列表中选择面部形状，允许自定义主体的面部结构。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- face_shape_weight
    - 设置面部形状在人像中的权重，影响所选面部形状的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- facial_asymmetry
    - 调整面部不对称程度，能够呈现更自然和多样化的面部结构。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hair_style
    - 从预定义列表中选择发型，提供多种选项以自定义主体的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- hair_color
    - 从预定义列表中选择发色，允许详细自定义主体的头发外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- hair_length
    - 从预定义列表中选择头发长度，能够控制主体头发长度的呈现。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- disheveled
    - 调整人像中凌乱外观的程度，允许对头发和整体整洁度的呈现进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- makeup
    - 从预定义列表中选择要应用于人像的化妆类型，提供一系列风格以增强主体的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- beard
    - 从预定义列表中为人像主体选择胡须样式，使面部毛发外观可自定义。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- natural_skin
    - 控制人像中皮肤纹理的自然程度，允许调整以实现更真实的皮肤外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bare_face
    - 调整不带化妆的面部特征的可见度，强调主体素颜的自然美。
    - Comfy dtype: FLOAT
    - Python dtype: float
- washed_face
    - 修改面部外观以呈现刚洗过的样子，影响皮肤的清新度和洁净度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dried_face
    - 改变外观以模拟洗脸后的干燥面部，影响皮肤的质地和水分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- skin_details
    - 调整皮肤细节的呈现程度，影响整体皮肤质感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- skin_pores
    - 控制皮肤毛孔的可见度，影响皮肤的细腻程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dimples
    - 调整酒窝的呈现程度，增添面部特征的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- wrinkles
    - 控制皱纹的显著程度，影响人像的年龄感和真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- freckles
    - 调整雀斑的呈现程度，增添面部特征的个性化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- moles
    - 控制痣的显著程度，增加面部细节的独特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- skin_imperfections
    - 调整皮肤瑕疵的呈现程度，增加真实感和个性化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- skin_acne
    - 控制痤疮的显著程度，影响皮肤状态的呈现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tanned_skin
    - 调整晒黑程度，影响皮肤的整体色调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- eyes_details
    - 控制眼睛细节的呈现程度，增强眼部的表现力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- iris_details
    - 调整虹膜细节的显著程度，增加眼睛的真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- circular_iris
    - 控制虹膜圆形程度，影响眼睛的整体形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- circular_pupil
    - 调整瞳孔圆形程度，影响眼睛的焦点和表现力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- light_type
    - 选择光线类型，影响整体照明效果和氛围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- light_direction
    - 指定光线方向，影响阴影和高光的分布。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- light_weight
    - 调整光线效果的强度，影响整体照明的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- photorealism_improvement
    - 启用或禁用人像的照片真实感增强，为生成的提示添加专业照片质量和平衡曝光。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prompt_start
    - 设置提示的起始部分，用于引导生成过程的初始方向。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_additional
    - 添加额外的提示内容，用于补充和细化生成指令。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_end
    - 设置提示的结束部分，用于总结或强调特定方面。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 指定要避免的元素或特征，用于引导生成过程避开不需要的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- style_i
    - 选择特定的艺术或摄影风格，影响整体美学表现。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- style_i_weight
    - 调整所选风格的权重，影响该风格在最终结果中的显著程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- random_shot
    - 启用随机选择拍摄方式，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_gender
    - 启用随机选择性别，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_age
    - 启用随机选择年龄，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_androgynous
    - 启用随机调整中性特征程度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_nationality
    - 启用随机选择国籍或种族背景，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_body_type
    - 启用随机选择体型，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_model_pose
    - 启用随机选择姿势，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_clothes
    - 启用随机选择服装风格，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_eyes_color
    - 启用随机选择眼睛颜色，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_eyes_shape
    - 启用随机选择眼睛形状，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_lips_color
    - 启用随机选择嘴唇颜色，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_lips_shape
    - 启用随机选择嘴唇形状，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_facial_expression
    - 启用随机选择面部表情，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_hairstyle
    - 启用随机选择发型，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_hair_color
    - 启用随机选择发色，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_hair_length
    - 启用随机选择头发长度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_disheveled
    - 启用随机调整凌乱程度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_makeup
    - 启用随机选择化妆风格，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_freckles
    - 启用随机调整雀斑程度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_moles
    - 启用随机调整痣的显著程度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_skin_imperfections
    - 启用随机调整皮肤瑕疵程度，增加生成结果的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_beard
    - 

## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)



## Source code
```python
class PortraitMaster:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        max_float_value = 1.95
        return {
            "optional": {
                "seed": ("INT", {"forceInput": False}),
            },
            "required": {
                "shot": (shot_list, {
                    "default": shot_list[0],
                }),
                "shot_weight": ("FLOAT", {
                    "default": 0,
                    "step": 0.05,
                    "min": 0,
                    "max": max_float_value,
                    "display": "slider",
                }),
                "gender": (gender_list, {
                    "default": gender_list[0],
                }),
                "androgynous": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "age": ("INT", {
                    "default": 30,
                    "min": 18,
                    "max": 90,
                    "step": 1,
                    "display": "slider",
                }),
                "nationality_1": (nationality_list, {
                    "default": nationality_list[0],
                }),
                "nationality_2": (nationality_list, {
                    "default": nationality_list[0],
                }),
                "nationality_mix": ("FLOAT", {
                    "default": 0.5,
                    "min": 0,
                    "max": 1,
                    "step": 0.05,
                    "display": "slider",
                }),
                "body_type": (body_type_list, {
                    "default": body_type_list[0],
                }),
                "body_type_weight": ("FLOAT", {
                    "default": 0,
                    "step": 0.05,
                    "min": 0,
                    "max": max_float_value,
                    "display": "slider",
                }),
                "model_pose": (model_pose_list, {
                    "default": model_pose_list[0],
                }),
                "clothes": (clothes_list, {
                    "default": clothes_list[0],
                }),

                "eyes_color": (eyes_color_list, {
                    "default": eyes_color_list[0],
                }),
                "eyes_shape": (eyes_shape_list, {
                    "default": eyes_shape_list[0],
                }),
                "lips_color": (lips_color_list, {
                    "default": lips_color_list[0],
                }),
                "lips_shape": (lips_shape_list, {
                    "default": lips_shape_list[0],
                }),
                "facial_expression": (facial_expressions_list, {
                    "default": facial_expressions_list[0],
                }),
                "facial_expression_weight": ("FLOAT", {
                    "default": 0,
                    "step": 0.05,
                    "min": 0,
                    "max": max_float_value,
                    "display": "slider",
                }),
                "face_shape": (face_shape_list, {
                    "default": face_shape_list[0],
                }),
                "face_shape_weight": ("FLOAT", {
                    "default": 0,
                    "step": 0.05,
                    "min": 0,
                    "max": max_float_value,
                    "display": "slider",
                }),
                "facial_asymmetry": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "hair_style": (hair_style_list, {
                    "default": hair_style_list[0],
                }),
                "hair_color": (hair_color_list, {
                    "default": hair_color_list[0],
                }),
                "hair_length": (hair_length_list, {
                    "default": hair_length_list[0],
                }),
                "disheveled": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "makeup": (makeup_list, {
                    "default": makeup_list[0],
                }),
                "beard": (beard_list, {
                    "default": beard_list[0],
                }),
                "natural_skin": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "bare_face": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "washed_face": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "dried_face": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "skin_details": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "skin_pores": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "dimples": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "wrinkles": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "freckles": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "moles": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "skin_imperfections": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "skin_acne": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "tanned_skin": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "eyes_details": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "iris_details": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "circular_iris": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "circular_pupil": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "light_type": (light_type_list, {
                    "default": light_type_list[0],
                }),
                "light_direction": (light_direction_list, {
                    "default": light_direction_list[0],
                }),
                "light_weight": ("FLOAT", {
                    "default": 0,
                    "min": 0,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "photorealism_improvement": (["enable", "disable"],),
                "prompt_start": ("STRING", {
                    "multiline": True,
                    "default": "raw photo, (realistic:1.5)"
                }),
                "prompt_additional": ("STRING", {
                    "multiline": True,
                    "default": ""
                }),
                "prompt_end": ("STRING", {
                    "multiline": True,
                    "default": ""
                }),
                "negative_prompt": ("STRING", {
                    "multiline": True,
                    "default": ""
                }),
                "style_1": (style_1_list, {
                    "default": style_1_list[0],
                }),
                "style_1_weight": ("FLOAT", {
                    "default": 1.5,
                    "min": 1,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "style_2": (style_2_list, {
                    "default": style_2_list[0],
                }),
                "style_2_weight": ("FLOAT", {
                    "default": 1.5,
                    "min": 1,
                    "max": max_float_value,
                    "step": 0.05,
                    "display": "slider",
                }),
                "random_shot": ("BOOLEAN", {"default": False}),
                "random_gender": ("BOOLEAN", {"default": False}),
                "random_age": ("BOOLEAN", {"default": False}),
                "random_androgynous": ("BOOLEAN", {"default": False}),
                "random_nationality": ("BOOLEAN", {"default": False}),
                "random_body_type": ("BOOLEAN", {"default": False}),
                "random_model_pose": ("BOOLEAN", {"default": False}),
                "random_clothes": ("BOOLEAN", {"default": False}),
                "random_eyes_color": ("BOOLEAN", {"default": False}),
                "random_eyes_shape": ("BOOLEAN", {"default": False}),
                "random_lips_color": ("BOOLEAN", {"default": False}),
                "random_lips_shape": ("BOOLEAN", {"default": False}),
                "random_facial_expression": ("BOOLEAN", {"default": False}),
                "random_hairstyle": ("BOOLEAN", {"default": False}),
                "random_hair_color": ("BOOLEAN", {"default": False}),
                "random_hair_length": ("BOOLEAN", {"default": False}),
                "random_disheveled": ("BOOLEAN", {"default": False}),
                "random_makeup": ("BOOLEAN", {"default": False}),
                "random_freckles": ("BOOLEAN", {"default": False}),
                "random_moles": ("BOOLEAN", {"default": False}),
                "random_skin_imperfections": ("BOOLEAN", {"default": False}),
                "random_beard": ("BOOLEAN", {"default": False}),
                "random_style_1": ("BOOLEAN", {"default": False}),
                "random_style_2": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("positive", "negative",)

    FUNCTION = "pm"

    CATEGORY = "AI WizArt"

    def pm(self, shot="-", shot_weight=1, gender="-", body_type="-", body_type_weight=0, eyes_color="-", facial_expression="-", facial_expression_weight=0, face_shape="-", face_shape_weight=0, nationality_1="-", nationality_2="-", nationality_mix=0.5, age=30, hair_style="-", hair_color="-", disheveled=0, dimples=0, freckles=0, skin_pores=0, skin_details=0, moles=0, skin_imperfections=0, wrinkles=0, tanned_skin=0, eyes_details=1, iris_details=1, circular_iris=1, circular_pupil=1, facial_asymmetry=0, prompt_additional="", prompt_start="", prompt_end="", light_type="-", light_direction="-", light_weight=0, negative_prompt="", photorealism_improvement="disable", beard="-", model_pose="-", skin_acne=0, style_1="-", style_1_weight=0, style_2="-", style_2_weight=0, androgynous=0, natural_skin=0, bare_face=0, washed_face=0, dried_face=0, random_gender=False, random_age=False, random_nationality=False, random_hairstyle=False, random_eyes_color=False, random_hair_color=False, random_disheveled=False, random_freckles=False, random_moles=False, random_beard=False, random_shot=False, random_androgynous=False, random_facial_expression=False, random_skin_imperfections=False, random_style_1=False, random_style_2=False, random_body_type=False, random_model_pose=False, hair_length="-", random_hair_length=False, eyes_shape="-", random_eyes_shape=False, lisp_shape="-", lips_color="-", random_lips_color=False, lips_shape="-", random_lips_shape=False, makeup="-", random_makeup=False, clothes="-", random_clothes=False, seed=0):

        prompt = []

        # RANDOMIZER SWITCHES

        if random_shot:
            shot = random.choice(shot_list)
            shot_weight = random.uniform(0.5,1.25)

        if random_gender:
            gender = random.choice(gender_list)

        if random_age:
            age = random.randint(18,75)

        if random_nationality:
            nationality_1 = random.choice(nationality_list)
            nationality_2 = "-"

        if random_hairstyle:
            hair_style = random.choice(hair_style_list)

        if random_model_pose:
            model_pose = random.choice(model_pose_list)

        if random_eyes_color:
            eyes_color = random.choice(eyes_color_list)

        if random_eyes_shape:
            eyes_shape = random.choice(eyes_shape_list)

        if random_lips_color:
            lips_color = random.choice(lips_color_list)

        if random_lips_shape:
            lips_shape = random.choice(lips_shape_list)

        if random_hair_color:
            hair_color = random.choice(hair_color_list)

        if random_hair_length:
            hair_length = random.choice(hair_length_list)

        if random_facial_expression:
            facial_expression = random.choice(facial_expressions_list)
            facial_expression_weight = random.uniform(0.5,1.25)

        if random_body_type:
            body_type = random.choice(body_type_list)
            body_type_weight = random.uniform(0.25,1.25)

        if random_beard:
            beard = random.choice(beard_list)

        if random_androgynous:
            androgynous = random.uniform(0,1)

        if random_disheveled:
            disheveled = random.uniform(0,1.35)

        if random_clothes:
            clothes = random.choice(clothes_list)

        if random_makeup:
            makeup = random.choice(makeup_list)

        if random_freckles:
            freckles = random.uniform(0,1.35)

        if random_moles:
            moles = random.uniform(0,1.35)

        if random_style_1:
            style_1 = random.choice(style_1_list)
            style_1_weight = random.uniform(0.5,1.5)

        if random_style_2:
            style_2 = random.choice(style_2_list)
            style_2_weight = random.uniform(0.5,1.5)

        if random_skin_imperfections:
            skin_imperfections = random.uniform(0.15,1)

        # OPTIONS

        if gender == "-":
            gender = ""
        else:
            gender = gender + " "

        if nationality_1 != '-' and nationality_2 != '-':
            nationality = f"[{nationality_1}:{nationality_2}:{round(nationality_mix, 2)}] "
        elif nationality_1 != '-':
            nationality = nationality_1 + " "
        elif nationality_2 != '-':
            nationality = nationality_2 + " "
        else:
            nationality = ""

        if prompt_start != "":
            prompt.append(f"{prompt_start}")

        if shot != "-" and shot_weight > 0:
            prompt.append(applyWeight(shot,shot_weight))

        prompt.append(f"({nationality}{gender}{round(age)}-years-old:1.5)")

        if androgynous > 0:
            prompt.append(applyWeight('androgynous',androgynous))

        if body_type != "-" and body_type_weight > 0:
            prompt.append(applyWeight(f"{body_type}, {body_type} body",body_type_weight))

        if model_pose != "-":
            prompt.append(f"({model_pose}:1.25)")

        if clothes != "-":
            prompt.append(f"({clothes}:1.05)")

        if eyes_color != "-":
            prompt.append(f"({eyes_color} eyes:1.05)")

        if eyes_shape != "-":
            prompt.append(f"({eyes_shape}:1.05)")

        if lips_color != "-":
            prompt.append(f"({lips_color}:1.05)")

        if lips_shape != "-":
            prompt.append(f"({lips_shape}:1.05)")

        if makeup != "-":
            prompt.append(f"({makeup}:1.05)")

        if facial_expression != "-" and facial_expression_weight > 0:
            prompt.append(applyWeight(f"{facial_expression}, {facial_expression} expression",facial_expression_weight))

        if face_shape != "-" and face_shape_weight > 0:
            prompt.append(applyWeight(f"{face_shape} shape face",face_shape_weight))

        if hair_style != "-":
            prompt.append(f"({hair_style} cut hairstyle:1.05)")

        if hair_color != "-":
            prompt.append(f"({hair_color} hair:1.05)")

        if hair_length != "-":
            prompt.append(f"({hair_length}:1.05)")

        if beard != "-":
            prompt.append(f"({beard}:1.15)")

        if disheveled != "-" and disheveled > 0:
            prompt.append(applyWeight('disheveled',disheveled))

        if prompt_additional != "":
            prompt.append(f"{prompt_additional}")

        if natural_skin > 0:
            prompt.append(applyWeight('natural skin',natural_skin))

        if bare_face > 0:
            prompt.append(applyWeight('bare face',bare_face))

        if washed_face > 0:
            prompt.append(applyWeight('washed-face',washed_face))

        if dried_face > 0:
            prompt.append(applyWeight('dried-face',dried_face))

        if skin_details > 0:
            prompt.append(applyWeight('skin details, skin texture',skin_details))

        if skin_pores > 0:
            prompt.append(applyWeight('skin pores',skin_pores))

        if skin_imperfections > 0:
            prompt.append(applyWeight('skin imperfections',skin_imperfections))

        if skin_acne > 0:
            prompt.append(applyWeight('acne, skin with acne',skin_acne))

        if wrinkles > 0:
            prompt.append(applyWeight('wrinkles',wrinkles))

        if tanned_skin > 0:
            prompt.append(applyWeight('tanned skin',tanned_skin))

        if dimples > 0:
            prompt.append(applyWeight('dimples',dimples))

        if freckles > 0:
            prompt.append(applyWeight('freckles',freckles))

        if moles > 0:
            prompt.append(applyWeight('moles',moles))

        if eyes_details > 0:
            prompt.append(applyWeight('eyes details',eyes_details))

        if iris_details > 0:
            prompt.append(applyWeight('iris details',iris_details))

        if circular_iris > 0:
            prompt.append(applyWeight('circular details',circular_iris))

        if circular_pupil > 0:
            prompt.append(applyWeight('circular pupil',circular_pupil))

        if facial_asymmetry > 0:
            prompt.append(applyWeight('facial asymmetry, face asymmetry',facial_asymmetry))

        if light_type != '-' and light_weight > 0:
            if light_direction != '-':
                prompt.append(applyWeight(f"{light_type} {light_direction}",light_weight))
            else:
                prompt.append(applyWeight(f"{light_type}",light_weight))

        if style_1 != '-' and style_1_weight > 0:
            prompt.append(applyWeight(style_1,style_1_weight))

        if style_2 != '-' and style_2_weight > 0:
            prompt.append(applyWeight(style_2,style_2_weight))

        if prompt_end != "":
            prompt.append(f"{prompt_end}")

        prompt = ", ".join(prompt)
        prompt = prompt.lower()

        if photorealism_improvement == "enable":
            prompt = prompt + ", (professional photo, balanced photo, balanced exposure:1.2)"

        if photorealism_improvement == "enable":
            negative_prompt = negative_prompt + ", (shinny skin, shiny skin, reflections on the skin, skin reflections:1.35)"

        print("=============================================================")
        print("Portrait Master positive prompt:")
        print(prompt)
        print("")
        print("Portrait Master negative prompt:")
        print(negative_prompt)
        print("=============================================================")

        return (prompt,negative_prompt,)

```
