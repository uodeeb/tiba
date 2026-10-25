import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CrucibleFluid } from '../components/CrucibleFluid';
import { MoodSlider } from '../components/MoodSlider';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, Check, Compass, Shield, BookOpen, Info } from 'lucide-react';

export const FragranceAdvisorView: React.FC = () => {
  const {
    products,
    quizAnswers,
    setQuizAnswer,
    resetQuiz,
    setQuizResultProduct,
    openNoteExplainer,
    setView
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const moodValue = quizAnswers.moodSliderValue ?? 70;

  // Calculate matching progress
  const progress = Math.min(100, Math.round((step / 4) * 80 + (moodValue / 100) * 20));

  const handleFinishQuiz = () => {
    // Advanced Scoring logic blending Mood Slider (0-100) + Quiz parameters
    let matched = products[0]; // default royal oud
    const vibe = quizAnswers.vibe;
    const occasion = quizAnswers.occasion;
    const mood = quizAnswers.moodSliderValue ?? 70;

    if (mood < 28) {
      matched = products.find(p => p.id === 'tiba-florian-zahra') || products[5];
    } else if (mood < 50) {
      matched = products.find(p => p.id === 'tiba-night-musk') || products[2];
    } else if (mood < 75) {
      if (vibe === 'spicy_floral' || occasion === 'office') {
        matched = products.find(p => p.id === 'tiba-leather-prestige') || products[3];
      } else {
        matched = products.find(p => p.id === 'tiba-amber-sultani') || products[1];
      }
    } else {
      if (vibe === 'smoky_oud' || mood >= 85 || quizAnswers.intensity === 'beast_mode') {
        matched = products[0]; // طيبة عود ملكي معتق
      } else {
        matched = products.find(p => p.id === 'tiba-patchouli-noir') || products[4];
      }
    }

    setQuizResultProduct(matched);
    setView('quiz-result');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header with Scent Notes Database Trigger */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مستشار العطور الذكي • مرجل الخيمياء العطرية</span>
          </div>

          <button
            type="button"
            onClick={() => openNoteExplainer('oud-cambodian')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1810] hover:bg-[#2a2418] border border-[#f2ca50]/40 text-[#f2ca50] text-xs font-bold transition shadow"
            title="تعرف على أسرار ورائحة مكونات العطور الملكية"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>موسوعة المكونات الشمّية (Scent DB)</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
          اكتشف عطرك الملكي المطابق لهويتك
        </h1>
        <p className="text-xs sm:text-sm text-[#a69c8a] max-w-lg mx-auto">
          تحكّم في مقياس المزاج العطري وانتقل بسلاسة بين الانتعاش والغموض، وتعرّف على أسرار النوتات
        </p>
      </div>

      {/* Main Crucible Grid */}
      <div className="bg-[#141312]/90 border border-[#f2ca50]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Crucible Liquid Wave */}
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-[#f2ca50]/20 pb-6 md:pb-0 md:pl-6">
            <CrucibleFluid
              progressPercentage={progress}
              title={`المرحلة ${step} من 4`}
              subtitle={
                step === 1 ? 'تحديد طبيعة الاستخدام والمجلس' :
                step === 2 ? 'ضبط مقياس المزاج العطري (Mood Slider)' :
                step === 3 ? 'ملاءمة الفصول ومناخ الصعيد' : 'ضبط قوة الفوحان والهالة المحيطية'
              }
            />

            <div className="mt-2 text-center">
              <span className="text-[11px] text-[#f2ca50] font-mono-num font-semibold">
                معامل التوافق الكيميائي: {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Right Column: Quiz Step Content */}
          <div className="md:col-span-7 space-y-6 text-right">
            {/* Step 1: Occasion */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#f2ca50] font-bold">الخطوة الأولى</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    ما هي المناسبة والمجلس الذي ترغب في التألق به؟
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'royal', label: 'المناسبات الملكية والأعراس والمجالس الكبرى', desc: 'حضور مهيب يفرض هيبته فور الدخول' },
                    { id: 'daily', label: 'الاستخدام اليومي الراقي ومكان العمل', desc: 'نقاء وفخامة غير مزعجة تدوم طوال ساعات اليوم' },
                    { id: 'evening', label: 'الأمسيات الخاصة واللقاءات الهامة', desc: 'جاذبية دافئة وأثر مغناطيسي حميمي' },
                    { id: 'office', label: 'اجتماعات القيادة وعقد الصفقات', desc: 'ثقة حازمة ونفحات خشبية وجلدية فخمة' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setQuizAnswer('occasion', opt.id)}
                      className={`p-3.5 rounded-xl border text-right transition flex items-center justify-between ${
                        quizAnswers.occasion === opt.id
                          ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-[0_0_15px_rgba(242,202,80,0.2)]'
                          : 'bg-[#090807]/60 border-white/10 hover:border-[#f2ca50]/40 text-[#c4bba9]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm block text-white">{opt.label}</span>
                        <span className="text-[11px] text-[#a69c8a]">{opt.desc}</span>
                      </div>
                      {quizAnswers.occasion === opt.id && (
                        <div className="w-5 h-5 rounded-full bg-[#f2ca50] text-[#090807] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Interactive Mood Slider & Scent Family Exploration */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-[#f2ca50] font-bold">الخطوة الثانية</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    مقياس المزاج العطري التفاعلي (Mood Slider)
                  </h3>
                  <p className="text-xs text-[#a69c8a] mt-1">
                    اسحب المؤشر بانسيابية لتحديد توازن العطر بين الانتعاش الحمضي والغموض العودي:
                  </p>
                </div>

                {/* THE INTERACTIVE MOOD SLIDER */}
                <MoodSlider
                  value={moodValue}
                  onChange={(val) => {
                    setQuizAnswer('moodSliderValue', val);
                    // Dynamically map to vibe
                    if (val < 30) setQuizAnswer('vibe', 'fresh_citrus');
                    else if (val < 60) setQuizAnswer('vibe', 'sweet_amber');
                    else setQuizAnswer('vibe', 'smoky_oud');
                  }}
                />

                {/* Scent Database Quick-Learn Cards */}
                <div className="pt-2 border-t border-[#f2ca50]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#a69c8a] flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span>انقر على أي مكون لمعرفة كيف تُشم رائحته وسر ندرته:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => openNoteExplainer('oud-cambodian')}
                      className="text-[#f2ca50] hover:underline font-bold text-[11px]"
                    >
                      تصفح كافة النوتات ←
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'oud-cambodian', name: 'دهن عود كمبودي معتق' },
                      { id: 'amber-ambergris', name: 'عنبر الحوت الأشهب' },
                      { id: 'rose-taif', name: 'ورد طائفي نخب أول' },
                      { id: 'musk-white-tahara', name: 'مسك الطهارة الأبيض' },
                      { id: 'neroli-nile', name: 'نيرولي كابوا وزهر الليمون' },
                      { id: 'leather-cordovan', name: 'جلد كوردوفان الفاخر' }
                    ].map((note) => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => openNoteExplainer(note.id)}
                        className="px-2.5 py-1 bg-[#090807] hover:bg-[#1f1b14] text-[#c4bba9] hover:text-[#f2ca50] border border-[#f2ca50]/20 hover:border-[#f2ca50] rounded-lg text-[11px] font-medium transition flex items-center gap-1 group"
                      >
                        <span>{note.name}</span>
                        <span className="text-[10px] text-[#f2ca50] opacity-60 group-hover:opacity-100">ℹ️</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Climate & Season */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#f2ca50] font-bold">الخطوة الثالثة</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    في أي فصول أو أجواء تفضل ارتداء العطر؟
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'winter', label: 'الشتاء والأجواء الباردة والماطرة', desc: 'عطور ثقيلة ودافئة تعانق الصوف والمعاطف' },
                    { id: 'summer', label: 'الصيف وأجواء صعيد مصر الحارة', desc: 'ثبات ممتاز لا ينقلب حامضاً مع درجات الحرارة المرتفعة' },
                    { id: 'all', label: 'عطر متوازن مناسب لكافة فصول العام', desc: 'مرونة فائقة وتوازن هندسي في كافة الأجواء' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setQuizAnswer('season', opt.id)}
                      className={`p-3.5 rounded-xl border text-right transition flex items-center justify-between ${
                        quizAnswers.season === opt.id
                          ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-[0_0_15px_rgba(242,202,80,0.2)]'
                          : 'bg-[#090807]/60 border-white/10 hover:border-[#f2ca50]/40 text-[#c4bba9]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm block text-white">{opt.label}</span>
                        <span className="text-[11px] text-[#a69c8a]">{opt.desc}</span>
                      </div>
                      {quizAnswers.season === opt.id && (
                        <div className="w-5 h-5 rounded-full bg-[#f2ca50] text-[#090807] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Intensity & Sillage */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#f2ca50] font-bold">الخطوة الرابعة والأخيرة</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    ما هو مستوى الفوحان والانطباع الذي تبحث عنه؟
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'beast_mode', label: 'فوحان طاغي (Beast Mode) لأكثر من 3.5 أمتار', desc: 'يترك أثراً في المكان بعد مغادرتك بساعات' },
                    { id: 'intense', label: 'فوحان مميز وملحوظ (نطاق مترين)', desc: 'يلاحظه كل من يقترب منك ويبدي إعجابه به فوراً' },
                    { id: 'moderate', label: 'هالة أرستقراطية هادئة وحميمية', desc: 'عطر خاص يمنحك شعوراً بالنقاء والتميز دون صخب' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setQuizAnswer('intensity', opt.id)}
                      className={`p-3.5 rounded-xl border text-right transition flex items-center justify-between ${
                        quizAnswers.intensity === opt.id
                          ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-white shadow-[0_0_15px_rgba(242,202,80,0.2)]'
                          : 'bg-[#090807]/60 border-white/10 hover:border-[#f2ca50]/40 text-[#c4bba9]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm block text-white">{opt.label}</span>
                        <span className="text-[11px] text-[#a69c8a]">{opt.desc}</span>
                      </div>
                      {quizAnswers.intensity === opt.id && (
                        <div className="w-5 h-5 rounded-full bg-[#f2ca50] text-[#090807] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#f2ca50]/20">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>السابق</span>
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="px-3 py-2 text-gray-400 hover:text-white text-xs flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة الضبط</span>
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 bg-[#f2ca50] hover:bg-[#ffe17d] text-[#090807] font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition"
                >
                  <span>التالي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#b38b33] via-[#f2ca50] to-[#e8c178] text-[#090807] font-bold text-xs rounded-xl shadow-lg hover:opacity-95 flex items-center gap-1.5 transition"
                >
                  <span>كشف العطر المطابق</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
