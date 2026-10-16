import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Checkbox } from '../components/ui/Checkbox';
import { RadioCardGroup } from '../components/ui/RadioCardGroup';
import { PillRadioGroup } from '../components/ui/PillRadioGroup';
import { HoneypotField } from '../components/ui/HoneypotField';
import { Alert } from '../components/ui/Alert';
import { StatCounter } from '../components/ui/StatCounter';
import { AfricaSilhouette } from '../components/ui/AfricaSilhouette';
import { DottedMapPattern } from '../components/ui/DottedMapPattern';
import { FloatingDots } from '../components/ui/FloatingDots';
import { ArrowRight, Code, Sparkles, Terminal, Mail, Cpu, Globe } from 'lucide-react';

export const DevShowcasePage: React.FC = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['react', 'python']);
  const [radioTrack, setRadioTrack] = useState<string>('software');
  const [experienceLevel, setExperienceLevel] = useState<string>('intermediate');
  const [inputVal, setInputVal] = useState<string>('');
  const [errorInputVal, setErrorInputVal] = useState<string>('invalid-format');
  const [checkboxVal, setCheckboxVal] = useState<boolean>(true);

  const toggleChip = (id: string) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <PageWrapper>
      <title>Dev Component Showcase | AfriHub Internal</title>
      <meta name="robots" content="noindex,nofollow" />

      {/* Hero Banner */}
      <Section className="py-12 bg-[#F0EDEC] border-b border-[#D7C3AE]/40">
        <Container>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#1C1B1B] text-white text-xs font-bold font-sans">
              DEV ONLY
            </span>
            <span className="text-xs text-[#524534] font-medium">
              Excluded from production bundle and router
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B]">
            AfriHub Foundation Component Showcase
          </h1>
          <p className="text-sm text-[#524534] mt-2">
            Visual QA verification environment for all design tokens, variants, states, and responsive viewports.
          </p>
        </Container>
      </Section>

      {/* 1. BUTTONS */}
      <Section>
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Interactive Elements"
            title="1. Button Variants & Sizes"
            subtitle="Pill buttons with hover lift, arrow glide, and square plus-rotation micro-interactions."
          />

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-4">
                Variants (md size)
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Primary (Black Pill)
                </Button>
                <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Secondary (Gold Pill)
                </Button>
                <Button variant="outline">Outline Pill</Button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#524534] font-medium">Play:</span>
                  <Button variant="play" aria-label="Play video" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#524534] font-medium">CardAction:</span>
                  <Button variant="cardAction" aria-label="Expand card details" />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-4">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Small (sm)
                </Button>
                <Button variant="primary" size="md">
                  Medium (md)
                </Button>
                <Button variant="primary" size="lg">
                  Large (lg)
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-4">
                States
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" loading>
                  Loading State
                </Button>
                <Button variant="primary" disabled>
                  Disabled Primary
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Secondary
                </Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>

            {/* Polymorphic */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-4">
                Polymorphic Rendering
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button as="link" to="/join" variant="primary">
                  Rendered as Router Link (/join)
                </Button>
                <Button as="a" href="#top" variant="outline">
                  Rendered as Anchor Tag (#top)
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. CARDS */}
      <Section className="bg-[#F0EDEC]/40">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Surfaces & Containers"
            title="2. Card Variants"
            subtitle="20px radius cards with surface, tonal, dark, and outline treatments."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="surface" hoverLift>
              <h4 className="font-serif font-bold text-base mb-1 text-[#1C1B1B]">Surface Card</h4>
              <p className="text-xs text-[#524534] leading-relaxed">
                Clean white container with subtle drop shadow and hover lift.
              </p>
            </Card>

            <Card variant="tonal" hoverLift>
              <h4 className="font-serif font-bold text-base mb-1 text-[#1C1B1B]">Tonal Card</h4>
              <p className="text-xs text-[#524534] leading-relaxed">
                Warm tinted background with no border for secondary content.
              </p>
            </Card>

            <Card variant="dark" hoverLift>
              <h4 className="font-serif font-bold text-base mb-1 text-white">Dark Card</h4>
              <p className="text-xs text-[#F3F0EF]/80 leading-relaxed">
                Inverted deep surface for emphasis sections and features.
              </p>
            </Card>

            <Card variant="outline" hoverLift>
              <h4 className="font-serif font-bold text-base mb-1 text-[#1C1B1B]">Outline Card</h4>
              <p className="text-xs text-[#524534] leading-relaxed">
                Transparent background with subtle border for secondary cards.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 3. SECTION HEADER (LIGHT & DARK) */}
      <Section>
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Typography Hierarchy"
            title="3. Section Headers (Light & Dark)"
            subtitle="WCAG AA compliant contrast with gold eyebrow (#835500 on light, #F5A623 on dark)."
          />

          <div className="space-y-6">
            <div className="p-8 rounded-[20px] bg-white border border-[#D7C3AE]/40">
              <SectionHeader
                align="center"
                eyebrow="Light Mode Section Header"
                title="Pan-African Developer Excellence"
                subtitle="Centered alignment with Domine serif headline and readable DM Sans subtitle."
              />
            </div>

            <div className="p-8 rounded-[20px] bg-[#1C1B1B] border border-[#262626]">
              <SectionHeader
                darkMode
                align="center"
                eyebrow="Dark Mode Section Header"
                title="High-Stakes Continental Innovation"
                subtitle="White serif headline with gold eyebrow optimized for dark section contrast."
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. BADGES & CHIPS */}
      <Section className="bg-[#F0EDEC]/40">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Status & Selection"
            title="4. Badges & Interactive Chips"
            subtitle="Accessible chips for tracks, skills, and status tags with keyboard support."
          />

          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-3">
                Status Badges
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Applications Open</Badge>
                <Badge variant="warning">Scholarship Active</Badge>
                <Badge variant="info">Virtual Summit</Badge>
                <Badge variant="coral">Live Hackathon</Badge>
                <Badge variant="outline">Outline Tag</Badge>
                <Badge variant="dark">Official Partner</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#835500] font-bold mb-3">
                Selectable Filter Chips (Click or Space to Toggle)
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <Chip
                  label="React & TypeScript"
                  selected={selectedChips.includes('react')}
                  onToggle={() => toggleChip('react')}
                />
                <Chip
                  label="Python & PyTorch"
                  selected={selectedChips.includes('python')}
                  onToggle={() => toggleChip('python')}
                />
                <Chip
                  label="Product & Figma"
                  selected={selectedChips.includes('design')}
                  onToggle={() => toggleChip('design')}
                />
                <Chip
                  label="Cybersecurity"
                  selected={selectedChips.includes('security')}
                  onToggle={() => toggleChip('security')}
                />
                <Chip label="Disabled Chip" disabled />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. FORM CONTROLS */}
      <Section>
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Form Architecture"
            title="5. Form Controls (React Hook Form Compatible)"
            subtitle="Includes inline error validation with animated entrances, labels, helper text, and ARIA wiring."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
            {/* Column 1 */}
            <div className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Amina Bello"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                helperText="Enter your official name as it appears on certificates."
                required
              />

              <Input
                label="Email Address (Simulated Error)"
                placeholder="name@example.com"
                value={errorInputVal}
                onChange={(e) => setErrorInputVal(e.target.value)}
                error="Please enter a valid email address (e.g. name@example.com)"
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Select
                label="Country of Residence"
                required
                options={[
                  { value: 'ng', label: 'Nigeria' },
                  { value: 'ke', label: 'Kenya' },
                  { value: 'gh', label: 'Ghana' },
                  { value: 'rw', label: 'Rwanda' },
                  { value: 'za', label: 'South Africa' },
                  { value: 'eg', label: 'Egypt' },
                ]}
              />

              <Checkbox
                label="I agree to abide by the pan-African Community Code of Conduct."
                checked={checkboxVal}
                onChange={(e) => setCheckboxVal(e.target.checked)}
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <Textarea
                label="Tell us about your background & motivation"
                placeholder="What projects have you built or what would you like to achieve with AfriHub?"
                rows={4}
                helperText="Maximum 500 characters."
              />

              <PillRadioGroup
                label="Experience Level"
                value={experienceLevel}
                onChange={setExperienceLevel}
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
              />

              <HoneypotField />
            </div>
          </div>

          {/* RadioCardGroup demonstration */}
          <div className="mt-10 max-w-4xl">
            <RadioCardGroup
              label="Select Your Primary Tech Track"
              value={radioTrack}
              onChange={setRadioTrack}
              options={[
                {
                  value: 'software',
                  title: 'Software Engineering',
                  description: 'Frontend, backend, mobile, and distributed systems.',
                  icon: <Code className="w-4 h-4" />,
                },
                {
                  value: 'data_ai',
                  title: 'Data & Artificial Intelligence',
                  description: 'Machine learning, African NLP, and data engineering.',
                  icon: <Cpu className="w-4 h-4" />,
                },
                {
                  value: 'product_design',
                  title: 'Product Design & UI/UX',
                  description: 'Design systems, prototyping, and accessibility.',
                  icon: <Sparkles className="w-4 h-4" />,
                },
                {
                  value: 'cybersecurity',
                  title: 'Cybersecurity',
                  description: 'Application security, penetration testing, and defense.',
                  icon: <Terminal className="w-4 h-4" />,
                },
                {
                  value: 'other',
                  title: 'Pan-African Builder',
                  description: 'Founder, researcher, or open-source community organizer.',
                  icon: <Globe className="w-4 h-4" />,
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* 6. ALERTS */}
      <Section className="bg-[#F0EDEC]/40">
        <Container size="narrow">
          <SectionHeader
            align="left"
            eyebrow="Notifications & Feedback"
            title="6. Alert Notifications"
            subtitle="Accessible ARIA status and alert banners for success, validation errors, and network updates."
          />

          <div className="space-y-4">
            <Alert variant="success" title="Application Submitted Successfully">
              Welcome to AfriHub! Check your email at name@example.com for onboarding instructions.
            </Alert>

            <Alert variant="error" title="Submission Error">
              A member with this email address is already registered. Please contact support.
            </Alert>

            <Alert variant="info" title="Applications Closing Soon">
              Registration for the AfriBuild Summit closes in 48 hours. Ensure your team profile is complete.
            </Alert>
          </div>
        </Container>
      </Section>

      {/* 7. MOTIFS & STAT COUNTER */}
      <Section className="relative overflow-hidden">
        <DottedMapPattern />
        <FloatingDots count={4} />

        <Container>
          <SectionHeader
            align="left"
            eyebrow="Visual Identity & Motion"
            title="7. Visual Motifs & StatCounter"
            subtitle="SVG continent masks, geometric dot grid patterns, floating dots, and animated stat counters."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10 relative z-10">
            <Card variant="surface" className="text-center p-6">
              <StatCounter value="54" label="African Nations" />
            </Card>

            <Card variant="surface" className="text-center p-6">
              <StatCounter value="12,400+" label="Active Builders" />
            </Card>

            <Card variant="surface" className="text-center p-6">
              <StatCounter value="$2.5M+" label="Scholarships Funded" />
            </Card>

            <Card variant="surface" className="text-center p-6">
              <StatCounter value="98%" label="Placement Rate" />
            </Card>
          </div>

          <div className="p-8 rounded-[20px] bg-white border border-[#D7C3AE]/40 relative overflow-hidden flex items-center justify-between">
            <div className="max-w-md relative z-10">
              <h3 className="font-serif text-xl font-bold text-[#1C1B1B] mb-2">
                Africa Silhouette Background Mask
              </h3>
              <p className="text-sm text-[#524534]">
                The continent silhouette rendered from BlankMap-Africa.svg (Public Domain) serves as a subtle background watermark on cards and hero collages.
              </p>
            </div>
            <div className="w-48 h-48 relative">
              <AfricaSilhouette opacity={0.3} className="w-full h-full" />
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
};

export default DevShowcasePage;
