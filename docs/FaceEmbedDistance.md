# Documentation
- Class name: FaceEmbedDistance
- Category: FaceAnalysis
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_FaceAnalysis.git

FaceEmbedDistance节点旨在使用欧几里得和余弦距离度量来分析和比较面部特征。它处理输入图像和参考图像以确定相似性，促进面部的识别和验证。该节点的主要目标是通过提供面部嵌入的全面分析，增强面部识别任务。

# Input types
## Required
- analysis_models
    - 此参数包含用于面部检测和嵌入提取所需的模型，对于节点执行面部分析功能至关重要。
    - Comfy dtype: DICTIONARY
    - Python dtype: Dict[str, Any]
- reference
    - 参考图像对于与输入图像进行比较至关重要。它们作为计算距离和识别匹配的基线，对节点分析面部相似性的能力有着显著影响。
    - Comfy dtype: LIST
    - Python dtype: List[PIL.Image.Image]
- image
    - 这些是将被分析并与参考图像进行比较的图像。这些图像的质量和相关性直接影响节点的输出及其在面部识别中的有效性。
    - Comfy dtype: LIST
    - Python dtype: List[PIL.Image.Image]
## Optional
- filter_thresh_eucl
    - 欧几里得距离阈值用于过滤掉过于不相似的图像。它在控制面部相似性评估的严格程度方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- filter_thresh_cos
    - 余弦距离阈值与欧几里得阈值一起使用，以细化面部相似性评估，专注于面部嵌入的方向性而不仅仅是它们的幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- generate_image_overlay
    - 启用此选项时，它会在输入图像上生成一个覆盖层，显示距离度量，从而提供面部分析结果的视觉表示。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 输出图像，可能包含覆盖层，代表了分析后的输入图像。它们对于视觉验证和进一步分析至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[PIL.Image.Image]
- euclidean
    - 此输出提供欧几里得距离值，量化了参考图像和输入图像之间的差异程度，有助于评估面部相似性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cosine
    - 余弦距离值提供了面部嵌入之间方向性差异的度量，补充了欧几里得距离，以便进行更细致的面部相似性评估。
    - Comfy dtype: FLOAT
    - Python dtype: float
- csv
    - CSV输出包含面部分析的结构化记录，包括距离度量，可用于进一步的统计分析和报告。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FaceEmbedDistance:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'analysis_models': ('ANALYSIS_MODELS',), 'reference': ('IMAGE',), 'image': ('IMAGE',), 'filter_thresh_eucl': ('FLOAT', {'default': 1.0, 'min': 0.001, 'max': 2.0, 'step': 0.001}), 'filter_thresh_cos': ('FLOAT', {'default': 1.0, 'min': 0.001, 'max': 2.0, 'step': 0.001}), 'generate_image_overlay': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('IMAGE', 'FLOAT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('IMAGE', 'euclidean', 'cosine', 'csv')
    OUTPUT_NODE = True
    FUNCTION = 'analize'
    CATEGORY = 'FaceAnalysis'

    def analize(self, analysis_models, reference, image, filter_thresh_eucl=1.0, filter_thresh_cos=1.0, generate_image_overlay=True):
        if generate_image_overlay:
            font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Inconsolata.otf'), 32)
            background_color = ImageColor.getrgb('#000000AA')
            txt_height = font.getmask('Q').getbbox()[3] + font.getmetrics()[1]
        self.analysis_models = analysis_models
        ref = []
        for i in reference:
            ref_emb = self.get_descriptor(np.array(T.ToPILImage()(i.permute(2, 0, 1)).convert('RGB')))
            if ref_emb is not None:
                ref.append(torch.from_numpy(ref_emb))
        if ref == []:
            raise Exception('No face detected in reference image')
        ref = torch.stack(ref)
        ref = np.array(torch.mean(ref, dim=0))
        out = []
        out_eucl = []
        out_cos = []
        for i in image:
            img = np.array(T.ToPILImage()(i.permute(2, 0, 1)).convert('RGB'))
            img = self.get_descriptor(img)
            if img is None:
                eucl_dist = 1.0
                cos_dist = 1.0
            elif np.array_equal(ref, img):
                eucl_dist = 0.0
                cos_dist = 0.0
            else:
                eucl_dist = np.float64(np.linalg.norm(ref - img))
                cos_dist = 1 - np.dot(ref, img) / (np.linalg.norm(ref) * np.linalg.norm(img))
            if eucl_dist <= filter_thresh_eucl and cos_dist <= filter_thresh_cos:
                print(f'\x1b[96mFace Analysis: Euclidean: {eucl_dist}, Cosine: {cos_dist}\x1b[0m')
                if generate_image_overlay:
                    tmp = T.ToPILImage()(i.permute(2, 0, 1)).convert('RGBA')
                    txt = Image.new('RGBA', (image.shape[2], txt_height), color=background_color)
                    draw = ImageDraw.Draw(txt)
                    draw.text((0, 0), f'EUC: {round(eucl_dist, 3)} | COS: {round(cos_dist, 3)}', font=font, fill=(255, 255, 255, 255))
                    composite = Image.new('RGBA', tmp.size)
                    composite.paste(txt, (0, tmp.height - txt.height))
                    composite = Image.alpha_composite(tmp, composite)
                    out.append(T.ToTensor()(composite).permute(1, 2, 0))
                else:
                    out.append(i)
                out_eucl.append(eucl_dist)
                out_cos.append(cos_dist)
        if not out:
            raise Exception('No image matches the filter criteria.')
        img = torch.stack(out)
        csv = 'id,euclidean,cosine\n'
        if len(out_eucl) == 1:
            out_eucl = out_eucl[0]
            out_cos = out_cos[0]
            csv += f'0,{out_eucl},{out_cos}\n'
        else:
            for (id, (eucl, cos)) in enumerate(zip(out_eucl, out_cos)):
                csv += f'{id},{eucl},{cos}\n'
        return (img, out_eucl, out_cos, csv)

    def get_descriptor(self, image):
        embeds = None
        if self.analysis_models['library'] == 'insightface':
            faces = self.analysis_models['detector'].get(image)
            if len(faces) > 0:
                embeds = faces[0].normed_embedding
        else:
            faces = self.analysis_models['detector'](image)
            if len(faces) > 0:
                shape = self.analysis_models['shape_predict'](image, faces[0])
                embeds = np.array(self.analysis_models['face_recog'].compute_face_descriptor(image, shape))
        return embeds
```