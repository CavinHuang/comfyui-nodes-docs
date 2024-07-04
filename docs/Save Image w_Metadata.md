
# Documentation
- Class name: Save Image w_Metadata
- Category: ImageSaverTools
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Save Image w/Metadata节点专门用于保存带有额外元数据的图像，从而增强生成图像的可追溯性和上下文信息。它支持多种图像格式，并可以将自定义元数据（如生成参数和提示词）直接嵌入到图像文件中。

# Input types
## Required
- images
    - 要保存的图像，可能包含额外的上下文元数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filename
    - 保存图像的基本文件名，可以包含基于其他参数的动态命名格式。
    - Comfy dtype: STRING
    - Python dtype: str
- path
    - 图像将被保存的目录路径。
    - Comfy dtype: STRING
    - Python dtype: str
- extension
    - 保存图像的文件格式扩展名，支持PNG、JPEG和WEBP等格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 图像生成过程中涉及的步骤数，可能包含在元数据中。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 图像生成过程中使用的CFG（无分类器引导）尺度，可选择包含在元数据中。
    - Comfy dtype: FLOAT
    - Python dtype: float
- modelname
    - 用于生成图像的模型名称，可以包含在元数据中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sampler_name
    - 生成过程中使用的采样方法名称，可选择包含在元数据中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 图像生成过程中使用的调度器，可以包含在元数据中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- positive
    - 影响图像生成的正面提示词或关键词，可选择包含在元数据中。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 图像生成过程中避免使用的负面提示词或关键词，可选择包含在元数据中。
    - Comfy dtype: STRING
    - Python dtype: str
- seed_value
    - 图像创建过程中用于随机数生成的种子值，可选择包含在元数据中。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 生成图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 生成图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- lossless_webp
    - 使用WEBP格式时，指示是否以无损格式保存图像的标志。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- quality_jpeg_or_webp
    - JPEG或WEBP图像的质量设置，影响文件大小和图像清晰度。
    - Comfy dtype: INT
    - Python dtype: int
- counter
    - 可用于图像命名或排序的计数器，可能包含在元数据中。
    - Comfy dtype: INT
    - Python dtype: int
- time_format
    - 可以包含在文件名或元数据中的时间戳格式，为图像生成提供时间上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageSaveWithMetadata:
    def __init__(self):
        self.output_dir = folder_paths.output_directory

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", ),
                "filename": ("STRING", {"default": f'%time_%seed', "multiline": False}),
                "path": ("STRING", {"default": '', "multiline": False}),
                "extension": (['png', 'jpeg', 'webp'],),
                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "modelname": (folder_paths.get_filename_list("checkpoints"),),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
            },
            "optional": {
                "positive": ("STRING", {"default": 'unknown', "multiline": True}),
                "negative": ("STRING", {"default": 'unknown', "multiline": True}),
                "seed_value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 8}),
                "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 8}),
                "lossless_webp": ("BOOLEAN", {"default": True}),
                "quality_jpeg_or_webp": ("INT", {"default": 100, "min": 1, "max": 100}),
                "counter": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff }),
                "time_format": ("STRING", {"default": "%Y-%m-%d-%H%M%S", "multiline": False}),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "save_files"

    OUTPUT_NODE = True

    CATEGORY = "ImageSaverTools"

    def save_files(self, images, seed_value, steps, cfg, sampler_name, scheduler, positive, negative, modelname, quality_jpeg_or_webp,
                   lossless_webp, width, height, counter, filename, path, extension, time_format, prompt=None, extra_pnginfo=None):
        filename = make_filename(filename, seed_value, modelname, counter, time_format)
        path = make_pathname(path, seed_value, modelname, counter, time_format)
        ckpt_path = folder_paths.get_full_path("checkpoints", modelname)
        basemodelname = parse_name(modelname)
        modelhash = calculate_sha256(ckpt_path)[:10]
        comment = f"{handle_whitespace(positive)}\nNegative prompt: {handle_whitespace(negative)}\nSteps: {steps}, Sampler: {sampler_name}{f'_{scheduler}' if scheduler != 'normal' else ''}, CFG Scale: {cfg}, Seed: {seed_value}, Size: {width}x{height}, Model hash: {modelhash}, Model: {basemodelname}, Version: ComfyUI"
        output_path = os.path.join(self.output_dir, path)

        if output_path.strip() != '':
            if not os.path.exists(output_path.strip()):
                print(f'The path `{output_path.strip()}` specified doesn\'t exist! Creating directory.')
                os.makedirs(output_path, exist_ok=True)    

        filenames = self.save_images(images, output_path, filename, comment, extension, quality_jpeg_or_webp, lossless_webp, prompt, extra_pnginfo)

        subfolder = os.path.normpath(path)
        return {"ui": {"images": map(lambda filename: {"filename": filename, "subfolder": subfolder if subfolder != '.' else '', "type": 'output'}, filenames)}}

    def save_images(self, images, output_path, filename_prefix, comment, extension, quality_jpeg_or_webp, lossless_webp, prompt=None, extra_pnginfo=None) -> list[str]:
        img_count = 1
        paths = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            if images.size()[0] > 1:
                filename_prefix += "_{:02d}".format(img_count)

            if extension == 'png':
                metadata = PngInfo()
                metadata.add_text("parameters", comment)

                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))

                filename = f"{filename_prefix}.png"
                img.save(os.path.join(output_path, filename), pnginfo=metadata, optimize=True)
            else:
                filename = f"{filename_prefix}.{extension}"
                file = os.path.join(output_path, filename)
                img.save(file, optimize=True, quality=quality_jpeg_or_webp, lossless=lossless_webp)
                exif_bytes = piexif.dump({
                    "Exif": {
                        piexif.ExifIFD.UserComment: piexif.helper.UserComment.dump(comment, encoding="unicode")
                    },
                })
                piexif.insert(exif_bytes, file)

            paths.append(filename)
            img_count += 1
        return paths

```
